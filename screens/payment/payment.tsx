import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { setParkingSlot } from '../../redux/reducer/parking-slot-slice';
import { ParkingSlotType } from '../../types/parking-slot-type';
import { msToTime, getDifferenceDateString, getDifferenceDate, showAlert } from "../../utils"

export default function PaymentScreen({ navigation, route }) {
  const dispatch = useDispatch()
  const parkingSlot = useSelector(state => state.parkingSlot);
  const [totalPrice, setTotalPrice] = useState("calculating...")
  const slotDetails = route.params?.slotDetail || {}
  useEffect(() => {
    calculateCharge()
  }, [])

  const doPayment = () => {
    let tempList: ParkingSlotType[] = JSON.parse(JSON.stringify(parkingSlot?.parkingSlots|| []))
    for (const slot of tempList) {
      if (slot.id === slotDetails.id) {
        slot.isEmpty = true;
        break;
      }
    }
    dispatch(setParkingSlot(tempList))
    navigation.reset({
      index: 0,
      routes: [{ name: "CreateSlotScreen" }]
    })
    showAlert("Payment done.")
  }

  const calculateCharge = () => {
    const totalHourPrice = 10
    let { hour, minutes } = getDifferenceDate(slotDetails?.enterTime)
    let totalAmount = 0;
    totalAmount = totalHourPrice
    hour -= 2;
    if (hour > 0) {
      totalAmount = hour * totalHourPrice;
      totalAmount += totalHourPrice
    }
    setTotalPrice(`$${totalAmount}`)
  }
  return (
    <View style={[styles.container, styles.root]}>
      <View style={styles.lableRoot}>
        <Text style={styles.txtLable}>In time: </Text>
        <Text>{msToTime(slotDetails?.enterTime)}</Text>
      </View>

      <View style={[styles.lableRoot]}>
        <Text style={styles.txtLable}>Out time: </Text>
        <Text>{msToTime(slotDetails?.exitTime)}</Text>
      </View>

      <View style={[styles.lableRoot]}>
        <Text style={styles.txtLable}>Difference </Text>
        <Text testID={"Total-Time"}>{getDifferenceDateString(slotDetails.enterTime, true)}</Text>
      </View>

      <View style={[styles.chargeNote]}>
        <Text style={styles.txtLable}>Charge Notes </Text>
        <Text>1. First 2 hour $10</Text>
        <Text>2. $10 will be charged for every consecutive hour then after</Text>
      </View>

      <View style={[styles.lableRoot]}>
        <Text style={styles.txtLable}>Total Amount </Text>
        <Text testID="Total-Amount">{totalPrice}</Text>
      </View>

      <Button testId="Pay-Button" name="Pay" onPress={doPayment} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  root: {
    padding: 20
  },
  txtLable: {
    fontWeight: 'bold'
  },
  lableRoot: {
    flexDirection: 'row',
    marginTop: 10
  },
  chargeNote: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    padding: 10
  }
});