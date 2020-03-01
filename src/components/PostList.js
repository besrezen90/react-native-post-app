import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data, onOpen }) => {
	return (
		<View style={styles.wrap}>
			<FlatList
				data={data}
				keyExtractor={post => post.id.toString()}
				renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		padding: 10,
	},
})
