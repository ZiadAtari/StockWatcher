import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import StockData from "./HomePage.js";
import StockProfile from "./StockProfile.js";

const Index = () => {
  const [dataSpecific, setSpecificData] = useState(null);
  const [dataGainers, setGainerData] = useState(null);
  const [symbol, setSymbol] = useState('IBM');

  const getSpecificData = async (inputSymbol) => {
    const SYMBOL = inputSymbol || 'IBM';
    //WL36NU7F0PXERX26
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=5min&apikey=demo`;
    let result = await fetch(url);
    result = await result.json();
    setSpecificData(result);
  };

  const getGainerData = async () => {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo`;
    let gainersResult = await fetch(url);
    gainersResult = await gainersResult.json();
    setGainerData(gainersResult);
  };

  useEffect(() => {
    getSpecificData(symbol);
  }, [symbol]);

  useEffect(() => {
    getGainerData();
  }, []);


  const handleSearch = (inputSymbol) => {
    setSymbol(inputSymbol);
  };

  return (
    <View>
      {dataSpecific && dataGainers ? (
        <StockData
          dataSpecific={dataSpecific}
          dataGainers={dataGainers}
          onSearch={handleSearch}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Index;
