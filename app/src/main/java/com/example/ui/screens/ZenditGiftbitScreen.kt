package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.TrustViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ZenditGiftbitScreen(
    viewModel: TrustViewModel,
    onBack: () -> Unit
) {
    var msisdn by remember { mutableStateOf("+14155552671") }
    var topupAmount by remember { mutableStateOf("25.00") }
    var giftCardBrand by remember { mutableStateOf("Amazon") }
    var giftCardAmount by remember { mutableStateOf("50.00") }
    var successMsg by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Zendit & Giftbit Hub", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .background(MaterialTheme.colorScheme.background)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            if (successMsg != null) {
                item {
                    Surface(
                        color = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.2f),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(modifier = Modifier.padding(14.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text(successMsg ?: "", color = MaterialTheme.colorScheme.tertiary, fontWeight = FontWeight.Bold)
                            IconButton(onClick = { successMsg = null }, modifier = Modifier.size(20.dp)) {
                                Icon(Icons.Default.Close, contentDescription = "Dismiss")
                            }
                        }
                    }
                }
            }

            // Zendit Mobile Top Up & eSIM
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.PhoneAndroid, contentDescription = null, tint = MaterialTheme.colorScheme.secondary)
                            Text("Zendit Mobile Top Up & eSIM", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        }

                        OutlinedTextField(
                            value = msisdn,
                            onValueChange = { msisdn = it },
                            label = { Text("MSISDN / Phone Number") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        )

                        OutlinedTextField(
                            value = topupAmount,
                            onValueChange = { topupAmount = it },
                            label = { Text("Amount ($)") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        )

                        Button(
                            onClick = {
                                viewModel.processZenditTopup(msisdn, topupAmount)
                                successMsg = "Successfully processed Zendit top-up of $$topupAmount for $msisdn"
                            },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Dispatch Top-Up / eSIM Pass")
                        }
                    }
                }
            }

            // Giftbit Vouchers
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.CardGiftcard, contentDescription = null, tint = MaterialTheme.colorScheme.tertiary)
                            Text("Giftbit Rewards & Vouchers", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        }

                        OutlinedTextField(
                            value = giftCardBrand,
                            onValueChange = { giftCardBrand = it },
                            label = { Text("Brand (e.g. Amazon, Starbucks, Apple)") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        )

                        OutlinedTextField(
                            value = giftCardAmount,
                            onValueChange = { giftCardAmount = it },
                            label = { Text("Voucher Value ($)") },
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(10.dp)
                        )

                        Button(
                            onClick = {
                                successMsg = "Successfully issued Giftbit $giftCardBrand voucher for $$giftCardAmount"
                            },
                            modifier = Modifier.fillMaxWidth(),
                            colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.tertiary),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Issue Giftbit Voucher")
                        }
                    }
                }
            }
        }
    }
}
