import React, { useState, useCallback } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import HomeScreen_styles from "../styles/HomeScreen_styles";
import { Icon, TextInput } from "react-native-paper";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import products from "../products";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { BottomSheet } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { addProduct } from "../firebase/CRUDServices/addProduct";
import { launchImageLibrary } from "react-native-image-picker";

const UserProductScreen = () => {
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ShowAddProductModal, setShowAddProductModal] = useState(false);
  const [ShowEditProductModal, setShowEditProductModal] = useState(false);
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [location, setLocation] = useState("");

  const handleProductPress = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <ProductItem item={item} onPress={handleProductPress} />,
    [handleProductPress]
  );

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
        Alert.alert("Error", "Failed to pick image. Please try again.");
      } else {
        const source = {
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };
        setImage(source);
      }
    });
  };

  const handleAddProduct = async () => {
    if (image) {
      await addProduct(productName, price, comments, location, image);
      setShowAddProductModal(false);
    } else {
      Alert.alert("Error", "Please select an image.");
    }
  };

  const ProductItem = React.memo(({ item }) => (
    <TouchableOpacity
      style={HomeScreen_styles.item}
      onPress={() => handleProductPress(item)}
    >
      <Image
        source={{
          uri: `https://picsum.photos/300/300?${item.name}'`,
        }}
        style={HomeScreen_styles.image}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={HomeScreen_styles.name}>{item.name}</Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginVertical: 8,
            marginRight: 10,
            padding: 5,
          }}
        >
          <View>
            <Icon color="#4d5963" source="trash-can-outline" size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 14, color: "#888" }}>{item.price}</Text>
        <TouchableOpacity onPress={() => setShowEditProductModal(true)}>
          <View style={{ flexDirection: "row" }}>
            <Icon color="#4d5963" source="pencil" size={20} />
            <Text>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={HomeScreen_styles.container}>
      <View style={{ marginVertical: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 15,
            marginHorizontal: 10,
            elevation: 5,
          }}
        >
          <Text style={HomeScreen_styles.sellingText}>Add</Text>
          <Button
            onPress={() => setShowAddProductModal(true)}
            title="+"
            titleStyle={{ fontSize: 20 }}
            buttonStyle={{
              height: 50,
              width: 50,
              borderRadius: 50,
              alignSelf: "flex-end",
              marginRight: 20,
              backgroundColor: "#fc8e53",
            }}
          />
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ alignSelf: "center" }}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      <Modal
        visible={!!selectedProduct}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
        onBackdropPress={closeModal}
      >
        <View style={HomeScreen_styles.modalContainer}>
          <TouchableOpacity
            onPress={closeModal}
            style={{ alignSelf: "flex-end", padding: 5 }}
          >
            <MaterialCommunityIcons name="close" color="grey" size={25} />
          </TouchableOpacity>
          <ScrollView style={{ width: "95%", alignSelf: "center" }}>
            <View style={{ alignItems: "center", width: "100%" }}>
              <Image
                source={{
                  uri: `https://picsum.photos/300/300?'`,
                }}
                style={HomeScreen_styles.image}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View>
                  <Text style={HomeScreen_styles.ModalProductName}>
                    {selectedProduct?.name}
                  </Text>
                  <Text style={HomeScreen_styles.ModalProductPrice}>
                    {selectedProduct?.price}
                  </Text>
                </View>
                <View>
                  <Text style={HomeScreen_styles.ModalProductLocation}>
                    <IconButton
                      icon="map-marker"
                      size={20}
                      onPress={() => console.log("Pressed")}
                    />
                  </Text>
                  <Text style={HomeScreen_styles.ModalProductPrice}>
                    {selectedProduct?.location}
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%" }}>
                <Text style={HomeScreen_styles.ModalProductDescriptionHeading}>
                  Comments:
                </Text>
                <Text style={HomeScreen_styles.ModalProductDescription}>
                  {selectedProduct?.details}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Button
            onPress={() => {
              closeModal();
              setShowEditProductModal(true);
            }}
            title="Edit"
            buttonStyle={{
              backgroundColor: "#fc8e53",
              width: 200,
              borderRadius: 20,
              marginTop: 20,
            }}
          />
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.container}>
          <BottomSheet
            isVisible={ShowAddProductModal}
            containerStyle={styles.bottomSheetContainer}
            onBackdropPress={() => setShowAddProductModal(false)}
            backdropStyle={styles.backdrop}
          >
            <View style={styles.content}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 28 }}>Add Product</Text>
                <Text>Add your product info.</Text>
              </View>

              <ScrollView style={{ width: "100%" }}>
                <View>
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Product name"
                    value={productName}
                    onChangeText={setProductName}
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Price"
                    value={price}
                    onChangeText={setPrice}
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Comments"
                    value={comments}
                    onChangeText={setComments}
                    multiline
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Location"
                    value={location}
                    onChangeText={setLocation}
                  />
                  <TouchableOpacity onPress={selectImage}>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                        borderRadius: 5,
                        borderColor: "#ccc",
                        borderWidth: 1,
                      }}
                    >
                      <Text>Select Image</Text>
                    </View>
                  </TouchableOpacity>
                  {image && (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 100, height: 100, marginBottom: 20 }}
                    />
                  )}
                </View>

                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 20 }}
                >
                  <Button
                    title="Add product"
                    onPress={handleAddProduct}
                    buttonStyle={{
                      backgroundColor: "#fc8e53",
                      width: 200,
                      borderRadius: 20,
                      marginBottom: 20,
                    }}
                  />
                  <Button
                    onPress={() => setShowAddProductModal(false)}
                    title="Cancel"
                    buttonStyle={{
                      backgroundColor: "#adadad",
                      width: 200,
                      borderRadius: 20,
                      marginBottom: 20,
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </BottomSheet>
        </View>
        <View style={styles.container}>
          <BottomSheet
            isVisible={ShowEditProductModal}
            containerStyle={styles.bottomSheetContainer}
            onBackdropPress={() => setShowEditProductModal(false)}
            backdropStyle={styles.backdrop}
          >
            <View style={styles.content}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 28 }}>Edit</Text>
                <Text>Make changes to your product info here.</Text>
              </View>
              <ScrollView style={{ width: "100%" }}>
                <View>
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Product name"
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Price"
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Comments"
                    multiline
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Location"
                  />
                  <TextInput
                    style={{ backgroundColor: "#fff" }}
                    label="Image"
                  />
                </View>

                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 20 }}
                >
                  <Button
                    title="Save changes"
                    buttonStyle={{
                      backgroundColor: "#fc8e53",
                      width: 200,
                      borderRadius: 20,
                      marginBottom: 20,
                    }}
                  />
                  <Button
                    onPress={() => setShowEditProductModal(false)}
                    title="Cancel"
                    buttonStyle={{
                      backgroundColor: "#adadad",
                      width: 200,
                      borderRadius: 20,
                      marginBottom: 20,
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </BottomSheet>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    height: 600,
    alignItems: "flex-start",
  },
  text: {
    marginBottom: 10,
  },
});

export default UserProductScreen;
