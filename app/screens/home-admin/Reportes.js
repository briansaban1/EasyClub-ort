import React, { useEffect } from 'react';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { FlexBetweenWrapper, Space } from '../../components/styled-components';

import ReportBlockLarge from './ReportBlockLarge';
import { 
  getReporteGanancias
} from '../../store/user/action';

function Reportes() {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getReporteGanancias());    
  }, [])

    const ganancias = useSelector(store => store.user.ganancias)
    ganancias.map(d => console.log(d, 'mireee---------------------------------'));
    const generarReporte = ()  => {
        const { config } = RNFetchBlob;
          // construct csvString"tx_username": "briansaban", "valor": "300"}
          const headerString = 'Actividad,Fecha,Usuario,Valor\n';
          const rowString = ganancias.map(d => !d?.total ? `${d.concepto},${d.fecha},${d.tx_username},${d.valor} \n` : `Total: ${d.total} \n`).join('');
          const csvString = `${headerString}${rowString}`;
          
          // write the current list of answers to a local csv file
          const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
          console.log('pathToWrite', pathToWrite);
          // pathToWrite /storage/emulated/0/Download/data.csv
          
          config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            addAndroidDownloads : {
              useDownloadManager : true,
              notification : true,
              path:  pathToWrite,
            }
          })
          
          RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
                RNFetchBlob.android.addCompleteDownload({
                    title: 'data.csv',
                    description: 'Download complete',
                    mime: 'application/csv',
                    path: pathToWrite,
                    showNotification: true,
                  });
              console.log(`wrote file ${pathToWrite}`);
              // wrote file /storage/emulated/0/Download/data.csv
            })
            .catch(error => console.error(error));
    }
    

   

    return (
        <View >           
            <Space />
            <FlexBetweenWrapper paddingHorizontal={30}>
            <ReportBlockLarge
                    active={true}
                    onPress={() => generarReporte()}
                    label={'Nuevos Usuarios'}
                    description={'Cantidad de nuevos usuarios en este mes'}
                />
               
            </FlexBetweenWrapper>
            
        </View>
    );
}
export default Reportes;
