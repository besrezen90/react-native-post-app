import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { THEME } from '../theme'
import { Ionicons } from '@expo/vector-icons'

const navOptions = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor:
				Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
		},
		headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
	},
}

const PostNavigator = createStackNavigator(
	{
		Main: MainScreen,
		Post: PostScreen,
	},
	navOptions
)

const BookedNavigator = createStackNavigator(
	{
		Booked: BookedScreen,
		Post: PostScreen,
	},
	navOptions
)

const bottomTabsConfig = {
	Post: {
		screen: PostNavigator,
		navigationOptions: {
			tabBarLabel: 'All',
			tabBarIcon: info => (
				<Ionicons name="ios-albums" size={25} color={info.tintColor} />
			),
		},
	},
	Booked: {
		screen: BookedNavigator,
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: info => (
				<Ionicons name="ios-star" size={25} color={info.tintColor} />
			),
		},
	},
}

const BottomNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(bottomTabsConfig, {
				activeTintColor: '#fff',
				shifting: true,
				barStyle: {
					backgroundColor: THEME.MAIN_COLOR,
				},
		  })
		: createBottomTabNavigator(bottomTabsConfig, {
				tabBarOptions: {
					activeTintColor: THEME.MAIN_COLOR,
				},
		  })

const AboutNavigator = createStackNavigator(
	{
		About: {
			screen: AboutScreen,
		},
	},
	navOptions
)

const CreateNavigator = createStackNavigator(
	{
		Create: {
			screen: CreateScreen,
		},
	},
	navOptions
)

const MainNavigator = createDrawerNavigator(
	{
		PostTabs: {
			screen: BottomNavigator,
			navigationOptions: {
				drawerLabel: 'Main',
			},
		},
		About: {
			screen: AboutNavigator,
			navigationOptions: {
				drawerLabel: 'About us',
			},
		},
		Create: {
			screen: CreateNavigator,
			navigationOptions: {
				drawerLabel: 'Create new post',
			},
		},
	},
	{
		contentOptions: {
			activeTintColor: THEME.MAIN_COLOR,
			labelStyle: {
				fontFamily: 'open-bold',
			},
		},
	}
)

export const AppNavigation = createAppContainer(MainNavigator)
