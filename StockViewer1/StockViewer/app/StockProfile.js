import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const StockProfile = () => {
    // Get the passed data using useLocalSearchParams
    const { data } = useLocalSearchParams();

    // Parse the data back into a JavaScript object
    const dataSpecific = JSON.parse(data);
    const timeRange = "Time Series (5min)";
    const timeChoices = ["1min", "5min", "15min", "30min", "60min"]
    const timeSeries = dataSpecific[timeRange];
    const latestTimestamp = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTimestamp];

    const chartData = {
        labels: Object.keys(timeSeries).slice(0, 50).map((timestamp) => {
            return new Date(timestamp).toLocaleTimeString();
        }),
        datasets: [
            {
                data: Object.keys(timeSeries).slice(0, 50).map((timestamp) => timeSeries[timestamp]["1. open"]),
                color: (opacity = 1) => "white",

            }
        ],

    };



    const chartConfig = {

        backgroundGradientFrom: "#1E2923",
        color: (opacity = 1) => "white",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (

        <ScrollView style={{ padding: 30 }}>
            <View style={{ borderBottomWidth: 1.5, paddingBottom: 20, }}>
                <Text style={styles.header}>Stock Profile</Text>
                <Text style={styles.symbol}>Symbol: {dataSpecific["Meta Data"]["2. Symbol"]}</Text>
                <Text style={styles.Stats}>Open: {latestData["1. open"]}</Text>
                <Text style={styles.Stats}>High: {latestData["2. high"]}</Text>
                <Text style={styles.Stats}>Low: {latestData["3. low"]}</Text>
                <Text style={styles.Stats}>Close: {latestData["4. close"]}</Text>
                <Text style={styles.Stats}>Volume: {latestData["5. volume"]}</Text>
            </View>
            <View style={{ paddingBottom: 10 }}>

            </View>
            <Text style={styles.symbol}>Historical Data</Text>
            <View style={{ paddingBottom: 20 }}>

            </View>
            <ScrollView style={{ borderRadius: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                <LineChart style={{ paddingTop: 25, backgroundColor: '#1E2923' }}
                    data={chartData}
                    width={5000}
                    height={300}
                    chartConfig={chartConfig}
                />

            </ScrollView>


        </ScrollView>


    );

}

export default StockProfile;

const styles = StyleSheet.create({
    container: {
        padding: 40,
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,

    },
    Stats: {
        fontSize: 20,
    },
    symbol: {
        fontSize: 24,

    },
});

