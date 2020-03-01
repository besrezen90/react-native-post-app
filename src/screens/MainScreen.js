import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { HeaderButtons, Item, HeaderButton } from "react-navigation-header-buttons"
import { Post } from "../components/Post"
import { DATA } from "../data"
import { AppHeaderIcon } from "../components/AppHeaderIcon"

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
    headerTitle: "My blog",
    headerRight: (<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Take photo" iconName="ios-camera" onPress={() => console.log("Press photo")} />
    </HeaderButtons>)
}

const styles = StyleSheet.create({
    wrap: {
        padding: 10
    }
})
