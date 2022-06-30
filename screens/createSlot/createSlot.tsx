import React, { useState } from 'react';
import { Platform, View, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '../../components/Button';
import { useSelector, useDispatch } from "react-redux"
import { setParkingSlot } from '../../redux/reducer/parking-slot-slice';
import { ParkingSlotType } from '../../types/parking-slot-type';
import { validateCarNumber, string, showAlert } from '../../utils';
import moment from "moment";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function CreateSlot({ navigation }) {
  const [slotNumber, setSlotNumber] = useState<number>(10);
  const [carNumber, setCarNumber] = useState<string>("RJ 06 XP 0000");
  const parkingSlots = useSelector(state => state.parkingSlot)
  const dispatch = useDispatch();
  const handleReset = () => {
    setSlotNumber(0)
    dispatch(setParkingSlot([]))
  }
  const handleCreateSlot = () => {
    if (!slotNumber) {
      showAlert(string.errNoSlot)
      return;
    }
    const slots: ParkingSlotType[] = [];
    for (let i = 0; i < slotNumber; i++) {
      slots.push({
        id: uuidv4(),
        slotNumber: i + 1,
        isEmpty: true,
        carNumber: "",
        enterTime: null,
        exitTime: null
      })
    }
    dispatch(setParkingSlot(slots));
    navigation.navigate("ParkingSlotScreen")
  }
  const addCarInParking = () => {
    if (!carNumber) {
      showAlert(string.errorEnterCarNo)
      return;
    }
    if (!validateCarNumber(carNumber)) {
      showAlert(string.validCarError)
      return;
    }
    const emptySlots = parkingSlots.parkingSlots?.filter(({ isEmpty }: ParkingSlotType) => isEmpty);
    if (!emptySlots.length) {
      showAlert(string.parkingFull)
      return;
    }
    const randomSlot: ParkingSlotType = emptySlots[Math.floor(Math.random() * emptySlots.length)]
    const updatedSlots: ParkingSlotType[] = parkingSlots.parkingSlots.map((slot: ParkingSlotType) => {
      if (slot.id === randomSlot.id) {
        return {
          ...slot,
          isEmpty: false,
          carNumber: carNumber,
          enterTime: moment().unix()
        }
      } else return slot
    })
    setCarNumber("");
    dispatch(setParkingSlot(updatedSlots))
    navigation.navigate("ParkingSlotScreen")
  }
  return (
    <View style={styles.container}>
      <TextInput
        testID="Slot-Number-Input"
        style={styles.input}
        placeholder={"Enter Parking Slot Number"}
        placeholderTextColor={"gray"}
        keyboardType="number-pad"
        value={String(slotNumber)}
        onChangeText={(no) => { setSlotNumber(parseInt(no) && parseInt(no) || 0) }}
      />
      <View style={styles.buttonContainer}>
        <Button testId={"Create-Slot-Button"} name={"Create Slot"} onPress={handleCreateSlot} />
        <Button testId={"Reset-Slot-Button"} name={"Reset Slot"} rootStyle={{ marginHorizontal: 10 }} onPress={handleReset} />
        <Button testId={"View-Slot-Button"} name={"View Slot"} onPress={() => { navigation.navigate("ParkingSlotScreen") }} />
      </View>
      <View>
        <TextInput
          autoCapitalize={"characters"}
          testID={"Add-Car-In-Slot-Input"}
          style={styles.input}
          placeholder={"Enter Car Number"}
          placeholderTextColor={"gray"}
          value={carNumber}
          keyboardType="ascii-capable"
          onChangeText={setCarNumber}
        />
        <Button
          name={"Add Car In Parking"}
          testId="Add-Car-In-Slot-Button"
          rootStyle={{ marginVertical: 15 }}
          onPress={addCarInParking}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "gray"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
