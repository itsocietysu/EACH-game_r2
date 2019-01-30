import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import RenderQuestItem from './RenderQuestItem'

export class SectionListQuests extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'Passed', data: this.props.game_passed},
            {title: 'In process', data: this.props.game_process},
          ]}
          renderItem={({item}) => <RenderQuestItem item={item} />}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
