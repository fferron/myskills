import React, { Fragment, useState, useEffect } from 'react';
import {  
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  Platform,
  FlatList
 } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetting, setGreeting] = useState('');

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    console.log("new Skill", data);

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemovedSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

useEffect(() => {
  const currentHour = new Date().getHours();

  if(currentHour < 12)
  {
    setGreeting('Good morning');
  } 
  else if (currentHour >= 12 && currentHour < 18){
    setGreeting('Good afternoon');
  } 
  else {
    setGreeting('Good night');
  }
}, [mySkills])

  return (
 <Fragment>

 <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native</Text>
  
      <Text style={styles.greetings}>
        {greetting}
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder='New Skill'
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
        ></TextInput>

        <Button 
          onPress={handleAddNewSkill} 
          title="New"
        ></Button>

        <Text style={[styles.title, {marginVertical: 50}]}>
          My Skills
        </Text>

        <FlatList
          data={mySkills}
          keyExtractor={ item => item.id}
          renderItem={({ item }) =>(
            <SkillCard 
              skill={item.name}
              onPress={() => handleRemovedSkill(item.id)}
            ></SkillCard>
          )}
        >
        </FlatList>

    </SafeAreaView>
    </Fragment>
  )
}

export const Nome = "Learning";

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#121015',
    paddingHorizontal: 30, 
    paddingVertical: 70
  },
  title:{
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7, 
  },
  greetings:{
    color: '#FFF'
  }
});