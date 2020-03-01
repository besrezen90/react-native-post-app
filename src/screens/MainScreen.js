import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { Post } from "../components/Post"
import { DATA } from "../data"

export const MainScreen = ({ navigation }) => {
    const onOpenHandler = (post) => {
        navigation.navigate("Post", { postId: post.id, date: post.date })
    }

    return (
        <View style={styles.wrap}>
            <FlatList data={DATA} keyExtractor={post => post.id.toString()} renderItem={({ item }) => <Post post={item} onOpen={onOpenHandler} />} />
        </View>
    )
}

MainScreen.navigationOptions = {
    headerTitle: "My blog"
}

const styles = StyleSheet.create({
    wrap: {
        padding: 10
    }
})
