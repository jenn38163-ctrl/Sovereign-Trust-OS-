package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ui.TrustViewModel
import com.example.ui.screens.*
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    SovereignTrustApp()
                }
            }
        }
    }
}

@Composable
fun SovereignTrustApp() {
    val viewModel: TrustViewModel = viewModel()
    var currentRoute by remember { mutableStateOf("dashboard") }

    when (currentRoute) {
        "dashboard" -> DashboardScreen(
            viewModel = viewModel,
            onNavigate = { route -> currentRoute = route }
        )
        "rc3" -> Rc3HardeningScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "api_explorer" -> ApiExplorerScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "zendit" -> ZenditGiftbitScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "wallet" -> WalletFundsScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "transactions" -> TransactionsPromosScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "reports" -> ReportsLogsScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        "system" -> SystemPingBrandsScreen(
            viewModel = viewModel,
            onBack = { currentRoute = "dashboard" }
        )
        else -> DashboardScreen(
            viewModel = viewModel,
            onNavigate = { route -> currentRoute = route }
        )
    }
}

