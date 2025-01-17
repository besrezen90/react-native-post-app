import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { View, StyleSheet, Image, Button, Alert } from 'react-native'

async function askForPermissions() {
	const { status } = await Permissions.askAsync(
		Permissions.CAMERA,
		Permissions.CAMERA_ROLL
	)

	if (status !== 'granted') {
		Alert.alert('Error', 'Not Permissions')
		return false
	}
	return true
}

export const PhotoPicker = ({ onPick, image }) => {
	const OnTakePhoto = async () => {
		const hasPermissions = await askForPermissions()
		if (!hasPermissions) return
		const img = await ImagePicker.launchCameraAsync({
			quality: 0.7,
			allowsEditing: false,
			aspect: [16, 9],
		})
		onPick(img.uri)
	}
	return (
		<View style={styles.wrapper}>
			<Button title="Take photo" onPress={OnTakePhoto} />
			{!!image && <Image style={styles.image} source={{ uri: image }} />}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10,
	},
	image: {
		width: '100%',
		height: 200,
		marginTop: 10,
	},
})
