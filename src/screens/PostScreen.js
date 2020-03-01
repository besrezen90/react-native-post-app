import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	ScrollView,
	Alert,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { THEME } from '../theme'

export const PostScreen = ({ navigation }) => {
	const postId = navigation.getParam('postId')

	const post = DATA.find(el => el.id === postId)

	const onDelete = () => {
		Alert.alert(
			'Delete post',
			'Are you sure?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => console.log('OK Pressed'),
					style: 'destructive',
				},
			],
			{ cancelable: false }
		)
	}

	return (
		<ScrollView>
			<Image source={{ uri: post.img }} style={styles.image} />
			<View style={styles.textWrap}>
				<Text style={styles.text}>{post.text}</Text>
			</View>
			<Button
				title="Delete"
				color={THEME.DANGER_COLOR}
				onPress={onDelete}
			/>
		</ScrollView>
	)
}

PostScreen.navigationOptions = ({ navigation }) => {
	const date = navigation.getParam('date')

	const iconName = navigation.getParam('booked')
		? 'ios-star'
		: 'ios-star-outline'

	return {
		headerTitle: `Post ${new Date(date).toLocaleDateString()}`,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title="Take photo"
					iconName={iconName}
					onPress={() => console.log('Press photo')}
				/>
			</HeaderButtons>
		),
	}
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200,
	},
	textWrap: {
		padding: 10,
	},
	title: {
		fontFamily: 'open-regular',
	},
})
