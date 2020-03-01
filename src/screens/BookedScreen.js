import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Post } from '../components/Post'
import { DATA } from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

export const BookedScreen = ({ navigation }) => {
	const onOpenHandler = post => {
		navigation.navigate('Post', {
			postId: post.id,
			date: post.date,
			booked: post.booked,
		})
	}

	return (
		<View style={styles.wrap}>
			<FlatList
				data={DATA.filter(el => el.booked)}
				keyExtractor={post => post.id.toString()}
				renderItem={({ item }) => (
					<Post post={item} onOpen={onOpenHandler} />
				)}
			/>
		</View>
	)
}

BookedScreen.navigationOptions = {
	headerTitle: 'Favorites',
	headerLeft: (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title="Toggle Drawer"
				iconName="ios-menu"
				onPress={() => console.log('Press photo')}
			/>
		</HeaderButtons>
	),
}

const styles = StyleSheet.create({
	wrap: {
		padding: 10,
	},
})
