import React, { useState } from 'react';
import { Linking, ScrollView, View, LayoutAnimation } from 'react-native';
import { Header, ImageButton } from '../../components';
import { Divider, FlexWrapper } from '../../components/styled-components';
import Item from './Item';
import styles from './styles';
import { Title } from '../../components/Header';
import { faqs, contactTypes } from './data'
import {Screens} from '../../constants';
import FAQItem from './FAQ-Item';

function ContactScreen() {
    const [selected, setSelected] = useState(null);
    function openURL(url) {
        Linking.openURL(url)
    }
    return (
        <ScrollView style={styles.container}>
        
            <Header
                title={"Contacto"}
                description={"¿Alguna duda? Estamos para ayudarte "}
            />
           
            <FlexWrapper>
                <ImageButton
                    imageStyle={styles.social}
                    source={require('@assets/contact/instagram.png')}
                    onPress={() => { openURL("https://instagram.com/") }}
                />
                <ImageButton
                    imageStyle={styles.social}
                    source={require('@assets/contact/facebook.png')}
                    onPress={() => { openURL("https://facebook.com/") }}
                />
                <ImageButton
                    imageStyle={styles.social}
                    source={require('@assets/contact/twitter.png')}
                    onPress={() => { openURL("https://twitter.com/") }}
                />
                <ImageButton
                    imageStyle={styles.social}
                    source={require('@assets/contact/whatsapp.png')}
                    onPress={() => { openURL("https://api.whatsapp.com/send?phone=.....") }}
                />
            </FlexWrapper>

            <View style={styles.card}>
                {
                    contactTypes.map((item, index) => (
                        <>
                            <Item
                                label={item.label}
                                source={item.source}
                                screen={Screens.ContactUs}
                            />
                            
                            {index !== (contactTypes.length - 1) && <Divider />}
                        </>
                        
                    ))
                    
                }
                <Divider />
                <Item 
                 label= {"Términos y Condiciones"}
                 source= {require('@assets/contact/terms.png')}
                 screen={Screens.Politicas}
                />
            </View>
            <Title style={{ marginLeft: 30, marginTop: 25, marginBottom: 15, fontSize: 25}}>{"Preguntas Frecuentes"}</Title>

            <View style={styles.card}>
                {faqs.map((i, index) => (
                    <FAQItem
                        key={index.toString()}
                        data={i}
                        active={selected == index}
                        onPress={() => { setSelected(selected == index ? null : index); LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); }}
                    />))}
            </View>
            <View height={50}/>
           
           
        
        </ScrollView>
    );
}

export default ContactScreen;