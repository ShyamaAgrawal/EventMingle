import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

const Screen3 = () => {
  const [completedTasks, setcompletedTasks] = useState(10)
  const [totalTasks, settotalTasks] = useState(100)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (totalTasks > 0) {
      const percentage = (completedTasks / totalTasks) * 100;
      setProgress(percentage / 100); // Progress value should be between 0 and 1
    }
  }, [totalTasks, completedTasks]);

  return (
    <View style={styles.container}>
      
      <View style={styles.progressBar}>
        <Bar
          progress={progress}
          width={300}
          color="#0E6049" // Change color as needed
          borderColor="#000" // Change border color as needed
          height={20}
          borderRadius={30}
          animated={true}
          animationType='spring'
          style={styles.progressBar}
        >
          <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
        </Bar>
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circularIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db', // Change color as needed
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Change text color as needed
  },
  progressBar: {
    position: 'relative',
    top:'50%'
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    color: '#000', // Text color
  },
});

export default Screen3;
