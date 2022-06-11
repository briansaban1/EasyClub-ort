import React, { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, TextInput, View, SafeAreaView } from 'react-native';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SearchInvoice, SubmissionItem, ErrorInvoice } from '../../components';
import InvoiceItem from '../../components/InvoiceItem';
import { AppStyles, Images, Colors } from '../../constants';
import { getFacturas } from '../../store/user/action';
import styles from './styles';



function FacturasScreen() {
    const profile = useSelector(store => store.user.profile);


    const _facturas = useSelector(store => store.user.facturas);
    const [facturas, setFacturas] = useState(_facturas);
    
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        handleSearch();
    }, [searchValue])

//se realiza la busqueda en la lista segun el id de la factura    
    function handleSearch() {
        if (searchValue) {
            const filteredData = _facturas.filter(data => {
                const searchData = data && data.id.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setFacturas(filteredData)
        } else {
            setFacturas(_facturas)
        }
    }



         return (
        <>
            <ScrollView style={styles.container}>
           
                <Header
                    title={"Facturas"}
                    description={'Listado de facturas de tus actividades'}
                />
                <SearchInvoice
                    onChangeText={setSearchValue}
                    value={searchValue}
                />
                {_facturas.length == 0 &&
            <View style={{marginBottom:20}}>
                <ErrorInvoice /> 
                </View>
                }
                {facturas.map(i => <InvoiceItem data={i} profile={profile} onPress={(data) => {
                    setModalData(data);
                    setVisibleModal(true);
                   
                }} />)}
                
                <View style={{height:30}} />
                
            </ScrollView>
        
        </>
        
    );
    
}
export default FacturasScreen;
