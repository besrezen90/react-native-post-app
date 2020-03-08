import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/post'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { THEME } from '../theme'

export const MainScreen = ({ navigation }) => {
	const onOpenHandler = post => {
		navigation.navigate('Post', {
			postId: post.id,
			date: post.date,
			booked: post.booked,
		})
	}
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadPosts())
	}, [dispatch])

	const allPosts = useSelector(state => state.post.allPosts)
	const loading = useSelector(state => state.post.loading)

	if (loading) {
		return (
			<View style={styles.wrap}>
				<ActivityIndicator color={THEME.MAIN_COLOR} />
			</View>
		)
	}

	return <PostList data={allPosts} onOpen={onOpenHandler} />
}

MainScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: 'My blog',
	headerRight: (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title="Take photo"
				iconName="ios-camera"
				onPress={() => navigation.navigate('Create')}
			/>
		</HeaderButtons>
	),
	headerLeft: (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title="Toggle Drawer"
				iconName="ios-menu"
				onPress={() => navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	),
})

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
