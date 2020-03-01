import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Button,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/actions/post'

export const CreateScreen = ({ navigation }) => {
	const [text, setText] = useState('')

	const img =
		'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'

	const dispatch = useDispatch()

	const onSave = () => {
		const post = {
			date: new Date().toJSON(),
			text,
			img,
			booked: false,
		}
		dispatch(addPost(post))
		navigation.navigate('Main')
	}

	return (
		<ScrollView>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Create new post</Text>
					<TextInput
						style={styles.textarea}
						placeholder="Input post text"
						value={text}
						onChangeText={setText}
						multiline
					/>

					<Image
						source={{
							uri: img,
						}}
						style={{ width: '100%', height: 200, marginBottom: 10 }}
					/>

					<Button
						title="Create post"
						color={THEME.MAIN_COLOR}
						onPress={onSave}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	)
}

CreateScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Create new post',

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
	wrapper: {
		padding: 10,
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		marginVertical: 10,
		fontFamily: 'open-regular',
	},
	textarea: {
		padding: 10,
	},
})
