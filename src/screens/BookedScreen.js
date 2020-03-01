import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { PostList } from '../components/PostList'
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
		<PostList data={DATA.filter(el => el.booked)} onOpen={onOpenHandler} />
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
