import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { images } from "../../assets/images/images"
import { SlotContainerType } from "../../types/slot-container-type"
import { ParkingSlotType } from "../../types/parking-slot-type"
import { colors } from "../../utils"

const width = Dimensions.get('screen').width
const viewSize = (width / 2) - 20


export const SlotContainer = (props: SlotContainerType) => {
    const { isEmpty, slotNumber } = props.item
    const parkingStatus = (item: ParkingSlotType): string => {
        return `Slot ${slotNumber}\n ${item.isEmpty ? "Available" : "Not Available"}`
    }

    return (<TouchableOpacity disabled={isEmpty}
        style={styles.root}
        testID={`post-row-${props.index}`}
        onLongPress={() => props.onRemoveCar(props.index, props.item)}>
        <Text style={[styles.txtSlot, { color: isEmpty ? colors.green : colors.red }]}>{parkingStatus(props.item)}</Text>
        {!isEmpty && <View style={styles.carImgAndNumber}>
            <Text>{props.item.carNumber}</Text>
            <Image source={images.car} style={styles.carIcon} />
        </View>}
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    carImgAndNumber: {
        alignItems: "center"
    },
    root: {
        width: viewSize,
        height: viewSize,
        backgroundColor: colors.greyLight,
        margin: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    carIcon: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    txtSlot: {
        textAlign: "center"
    }
})