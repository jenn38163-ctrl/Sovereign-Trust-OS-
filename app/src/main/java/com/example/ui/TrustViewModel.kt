package com.example.ui

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

data class TransactionItem(
    val id: String,
    val title: String,
    val type: String,
    val amount: String,
    val status: String,
    val timestamp: String
)

data class BrandItem(
    val name: String,
    val category: String,
    val status: String,
    val region: String
)

data class LogItem(
    val endpoint: String,
    val method: String,
    val statusCode: Int,
    val durationMs: Long,
    val timestamp: String
)

class TrustViewModel : ViewModel() {
    private val _walletBalance = MutableStateFlow(14285.50)
    val walletBalance: StateFlow<Double> = _walletBalance.asStateFlow()

    private val _gatewayStatus = MutableStateFlow("Connected (Cloud Run Gateway - TLS 1.3)")
    val gatewayStatus: StateFlow<String> = _gatewayStatus.asStateFlow()

    private val _rc3Status = MutableStateFlow(true)
    val rc3Status: StateFlow<Boolean> = _rc3Status.asStateFlow()

    private val _transactions = MutableStateFlow(
        listOf(
            TransactionItem("TRX-9081", "Zendit eSIM Global Pass", "Telekom", "-$45.00", "SUCCESS", "12:10 PM"),
            TransactionItem("TRX-9080", "Giftbit Amazon $100 Voucher", "Rewards", "-$100.00", "SUCCESS", "11:45 AM"),
            TransactionItem("TRX-9079", "Wallet Auto-Topup via Ledger", "Funds", "+$2,500.00", "SUCCESS", "10:30 AM"),
            TransactionItem("TRX-9078", "Mobile Top Up (MSISDN +14155552671)", "Zendit", "-$25.00", "SUCCESS", "09:15 AM"),
            TransactionItem("TRX-9077", "API Gateway Key Rotation", "RC3 Security", "$0.00", "SECURED", "08:00 AM")
        )
    )
    val transactions: StateFlow<List<TransactionItem>> = _transactions.asStateFlow()

    private val _brands = MutableStateFlow(
        listOf(
            BrandItem("Zendit Mobile Connect", "Telecom", "Active", "Global"),
            BrandItem("Giftbit Rewards API", "Gift Cards", "Active", "NA / EMEA"),
            BrandItem("Stripe Ledger Sync", "Banking", "Active", "US-East"),
            BrandItem("Twilio MSISDN Lookup", "Verification", "Active", "Global")
        )
    )
    val brands: StateFlow<List<BrandItem>> = _brands.asStateFlow()

    private val _logs = MutableStateFlow(
        listOf(
            LogItem("/api/v1/zendit/topup", "POST", 200, 142, "12:10:04"),
            LogItem("/api/v1/giftbit/issue", "POST", 201, 218, "11:45:12"),
            LogItem("/api/v1/wallet/balance", "GET", 200, 45, "11:30:00"),
            LogItem("/api/v1/rc3/audit", "POST", 200, 310, "10:00:22")
        )
    )
    val logs: StateFlow<List<LogItem>> = _logs.asStateFlow()

    private val _apiResponse = MutableStateFlow("Select an API endpoint and tap 'Execute Request' to test gateway routing.")
    val apiResponse: StateFlow<String> = _apiResponse.asStateFlow()

    fun toggleRc3(enabled: Boolean) {
        _rc3Status.update { enabled }
    }

    fun executeApiTest(endpoint: String, payload: String) {
        val result = """
            {
              "status": "success",
              "gateway": "Cloud Run API Gateway",
              "endpoint": "$endpoint",
              "timestamp": "${System.currentTimeMillis()}",
              "payload_received": $payload,
              "audit_signature": "sha256-rc3-verified"
            }
        """.trimIndent()
        _apiResponse.update { result }
        
        // Add to logs
        val newLog = LogItem(endpoint, "POST", 200, (80..250).random().toLong(), "Just now")
        _logs.update { listOf(newLog) + it }
    }

    fun addFunds(amount: Double) {
        _walletBalance.update { it + amount }
        val newTrx = TransactionItem(
            id = "TRX-${(9082..9999).random()}",
            title = "Manual Funds Deposit",
            type = "Funds",
            amount = "+$" + String.format("%.2f", amount),
            status = "SUCCESS",
            timestamp = "Just now"
        )
        _transactions.update { listOf(newTrx) + it }
    }

    fun processZenditTopup(msisdn: String, amount: String) {
        val cost = amount.toDoubleOrNull() ?: 10.0
        _walletBalance.update { it - cost }
        val newTrx = TransactionItem(
            id = "TRX-${(9082..9999).random()}",
            title = "Mobile TopUp ($msisdn)",
            type = "Zendit",
            amount = "-$" + String.format("%.2f", cost),
            status = "SUCCESS",
            timestamp = "Just now"
        )
        _transactions.update { listOf(newTrx) + it }
    }
}
