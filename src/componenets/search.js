import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput } from "react-native";
import styles from "../styles/styles";
import { GetMovie } from "../services/services";
import SearchData from "./searchdata";
import Loader from "../loader"; 

export default Search = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.length >= 3) {
            setLoading(true);
            const timer = setTimeout(() => {
                getDetails(query);
            }, 5000);

            return () => {
                clearTimeout(timer); 
            };
        } else if (query.length === 0) {
            setData(null);
            setLoading(false);
        }
    }, [query]);

    const handleSearch = (query) => {
        setQuery(query);
    };

    const getDetails = async () => {
        const fetchedData = await GetMovie(`/search/movie`, query);
        setLoading(false);
        if (query.length >= 3) {
            setData(fetchedData);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
            <TextInput
                placeholder="Search Movie"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.searchBox}
                onChangeText={(query) => handleSearch(query)}
            />

            {data && <SearchData searchData={data} />}
            <Loader loading={loading} />
        </SafeAreaView>
    );
};
