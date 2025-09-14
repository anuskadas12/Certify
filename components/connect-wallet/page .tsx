"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  Wallet, 
  ChevronDown, 
  Copy, 
  ExternalLink, 
  LogOut, 
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  network: string | null
  provider: string | null
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export function ConnectWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    network: null,
    provider: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)

  // Show notification with auto-dismiss
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          await updateWalletState(accounts[0])
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }
  }

  const updateWalletState = async (address: string) => {
    try {
      // Get balance
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      // Get network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      const networkName = getNetworkName(chainId)

      setWallet({
        isConnected: true,
        address,
        balance: balanceInEth,
        network: networkName,
        provider: "MetaMask"
      })
      setError(null)
    } catch (error) {
      console.error('Error updating wallet state:', error)
      setError('Failed to fetch wallet details')
    }
  }

  const getNetworkName = (chainId: string): string => {
    const networks: { [key: string]: string } = {
      '0x1': 'Ethereum Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
      '0x38': 'BSC Mainnet',
      '0x61': 'BSC Testnet',
    }
    return networks[chainId] || 'Unknown Network'
  }

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.')
      showNotification('error', 'MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        await updateWalletState(accounts[0])
        showNotification('success', 'Wallet connected successfully!')
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      let errorMessage = 'Failed to connect wallet'
      
      if (error.code === 4001) {
        errorMessage = 'Connection rejected by user'
      } else if (error.code === -32002) {
        errorMessage = 'Connection request already pending in MetaMask'
      }
      
      setError(errorMessage)
      showNotification('error', errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setIsDisconnecting(true)
    
    try {
      // Clear application state immediately
      setWallet({
        isConnected: false,
        address: null,
        balance: null,
        network: null,
        provider: null,
      })
      setError(null)

      // Clear any stored connection data
      if (typeof window !== "undefined") {
        // Clear localStorage if you store any wallet data there
        localStorage.removeItem('walletConnected')
        localStorage.removeItem('walletAddress')
        
        // Note: We can't actually disconnect from MetaMask programmatically
        // The user needs to disconnect manually from MetaMask extension
        // But we can clear our app's connection state
      }

      showNotification('info', 'Wallet disconnected. To fully disconnect, please disconnect from MetaMask extension.')
      
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      showNotification('error', 'Error occurred while disconnecting')
    } finally {
      setIsDisconnecting(false)
    }
  }

  const copyAddress = async () => {
    if (wallet.address) {
      try {
        await navigator.clipboard.writeText(wallet.address)
        showNotification('success', 'Address copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy address:', error)
        showNotification('error', 'Failed to copy address')
      }
    }
  }

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const openEtherscan = () => {
    if (wallet.address) {
      const baseUrl = wallet.network?.includes('Mainnet') 
        ? 'https://etherscan.io' 
        : 'https://goerli.etherscan.io'
      window.open(`${baseUrl}/address/${wallet.address}`, '_blank')
    }
  }

  // Handle account changes and disconnections
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected from MetaMask
          setWallet({
            isConnected: false,
            address: null,
            balance: null,
            network: null,
            provider: null,
          })
          setError(null)
          showNotification('info', 'Wallet disconnected from MetaMask')
        } else if (accounts[0] !== wallet.address) {
          // User switched accounts
          updateWalletState(accounts[0])
          showNotification('info', 'Account switched')
        }
      }

      const handleChainChanged = (chainId: string) => {
        if (wallet.isConnected) {
          // Update network info when chain changes
          const networkName = getNetworkName(chainId)
          setWallet(prev => ({ ...prev, network: networkName }))
          showNotification('info', `Network switched to ${networkName}`)
        }
      }

      const handleDisconnect = () => {
        setWallet({
          isConnected: false,
          address: null,
          balance: null,
          network: null,
          provider: null,
        })
        setError(null)
        showNotification('info', 'Wallet disconnected')
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      window.ethereum.on('disconnect', handleDisconnect)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
          window.ethereum.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [wallet.address, wallet.isConnected])

  // Notification component
  const NotificationComponent = () => {
    if (!notification) return null

    const icons = {
      success: <CheckCircle className="w-4 h-4 text-green-600" />,
      error: <AlertCircle className="w-4 h-4 text-red-600" />,
      info: <AlertCircle className="w-4 h-4 text-blue-600" />
    }

    const bgColors = {
      success: 'bg-green-50 border-green-200',
      error: 'bg-red-50 border-red-200',
      info: 'bg-blue-50 border-blue-200'
    }

    return (
      <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-3 border rounded-lg shadow-lg ${bgColors[notification.type]} max-w-sm`}>
        {icons[notification.type]}
        <span className="text-sm">{notification.message}</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 ml-2"
          onClick={() => setNotification(null)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  if (!wallet.isConnected) {
    return (
      <>
        <div className="flex flex-col items-end gap-2">
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Wallet className="w-4 h-4 mr-2" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          {error && (
            <div className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}
        </div>
        <NotificationComponent />
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-background/95 hover:bg-background">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm">
                {wallet.address ? formatAddress(wallet.address) : "Connected"}
              </span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Wallet Connected</span>
            <Badge variant="secondary" className="text-xs">
              {wallet.provider}
            </Badge>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <div className="px-2 py-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address:</span>
              <div className="flex items-center gap-1">
                <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
                  {wallet.address ? formatAddress(wallet.address) : ""}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={copyAddress}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className="text-sm font-medium">{wallet.balance} ETH</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network:</span>
              <Badge variant="outline" className="text-xs">
                {wallet.network}
              </Badge>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={openEtherscan}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={disconnectWallet} 
            className="text-destructive"
            disabled={isDisconnecting}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NotificationComponent />
    </>
  )
}