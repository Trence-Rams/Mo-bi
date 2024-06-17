import React, { useState} from 'react';
import {FlatList, TouchableOpacity, Image, Text, Modal, View, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen_styles from '../styles/HomeScreen_styles';
import { Icon } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../products';



const UserProductScreen = () => {
    const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const ProductItem = React.memo(({ item }) => (
    <TouchableOpacity style={HomeScreen_styles.item} onPress={() => handleProductPress(item)}>
    <Image source={{ uri: `https://source.unsplash.com/300x300/?${item.name}` }} style={HomeScreen_styles.image} />
    <View style={{flexDirection:"row", justifyContent:'space-between'}}>
          <Text style={HomeScreen_styles.name}>{item.name}</Text>
          <TouchableOpacity style={{ alignItems:'center',marginVertical: 8,marginRight:10,padding:5}}>
              <View >
                  <Icon color="#4d5963" source="trash-can-outline" size={20}/>
              </View>
          </TouchableOpacity>
    </View>
    <View style ={{flexDirection:"row", justifyContent:'space-between',paddingHorizontal:10,marginBottom:8}}>
          <Text style={{fontSize: 14, color: '#888'}}>{item.price}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                      <View style={{flexDirection:"row"}}>
                          <Icon color="#4d5963" source="pencil" size={20}/>
                          <Text>Edit</Text>
                      </View>
          </TouchableOpacity>
    </View>
  </TouchableOpacity>
  ));

  const renderItem = ({ item }) => <ProductItem item={item} />;

  return (
    <SafeAreaView style={HomeScreen_styles.container}>
      
      <View style = {{marginVertical:15}}>
        <View style ={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text style={HomeScreen_styles.sellingText}>Edit</Text>
        <Button
        onPress={() => navigation.navigate('Form')}
        title="+"
        titleStyle={{fontSize:25}}
        buttonStyle={{height: 50, width: 50, borderRadius: 50, alignSelf: 'flex-end', marginRight: 20, backgroundColor: '#fc8e53' }}
        />
        </View>
      </View>
      
      <FlatList
        contentContainerStyle={{alignSelf:'center'}}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

<Modal
          visible={!!selectedProduct}
          animationType='fade'
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={HomeScreen_styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={{alignSelf: 'flex-end',padding:5}}>
            <Icon
                source="close"
                color="grey"
                size={25}
            />
            </TouchableOpacity>
            <ScrollView>
              <View  style={{paddingLeft:10}}>
              <Image source={{ uri: `https://source.unsplash.com/300x300/` }} style={HomeScreen_styles.modalImage} />
              <View style={{flexDirection:"row" ,display:"flex",justifyContent:"space-between",width:"80%"}}>
                  <View>
                      <Text style={HomeScreen_styles.ModalProductName}>Product 1</Text>
                      <Text style={HomeScreen_styles.ModalProductPrice}>R119.99</Text>
                </View>
                <View>
                    <Text style={HomeScreen_styles.ModalProductName}>Location</Text>
                    <Text style={HomeScreen_styles.ModalProductPrice}>Mafikeng</Text>
                </View>
            </View>
            <View style={{width:'80%'}}>
                <Text style={HomeScreen_styles.ModalProductDescriptionHeading}>Description:</Text>
                <Text style={HomeScreen_styles.ModalProductDescription}>The description here</Text>
            </View>
          </View>
        </ScrollView>
        <Button
          onPress={() => { closeModal();navigation.navigate('Edit')}}
          title="Edit"
          buttonStyle={{ backgroundColor: '#fc8e53', width: 200, borderRadius: 20,marginTop:20 }}
      />
       </View>
      </Modal>
      
    </SafeAreaView>
  );
}

export default UserProductScreen