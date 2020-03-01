import React, { useCallback, useEffect } from 'react'
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
import { THEME } from '../theme'
import { toggleBooked, removePost } from '../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'

export const PostScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const postId = navigation.getParam('postId')

	const toggleHandler = useCallback(() => {
		dispatch(toggleBooked(postId))
	}, [dispatch, postId])

	const allPosts = useSelector(state => state.post.allPosts)

	const booked = useSelector(store =>
		store.post.bookedPosts.some(post => post.id === postId)
	)

	useEffect(() => {
		navigation.setParams({ booked })
	}, [booked])

	useEffect(() => {
		navigation.setParams({ toggleHandler })
	}, [toggleHandler])

	const post = allPosts.find(el => el.id === postId)

	if (!post) {
		return null
	}

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
					onPress: () => {
						navigation.navigate('Main')
						dispatch(removePost(postId))
					},
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
	const toggleHandler = navigation.getParam('toggleHandler')

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
					onPress={toggleHandler}
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
