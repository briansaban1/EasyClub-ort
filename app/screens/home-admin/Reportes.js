import React from 'react';

import { View } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { FlexBetweenWrapper, Space } from '../../components/styled-components';

import ReportBlockLarge from './ReportBlockLarge';


function Reportes() {

    function downloadFile(url,fileName) {
        const { config, fs } = RNFetchBlob;
        const downloads = fs.dirs.DownloadDir;
        return config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache : true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : false,
            path:  downloads + '/' + fileName + '.csv',
          }
        })
        .fetch('GET', url);
      }

    const generarReporte = ()  => {
        const { config } = RNFetchBlob;
        const values = [
            ['build', '2017-11-05T05:40:35.515Z'],
            ['deploy', '2017-11-05T05:42:04.810Z']
          ];
          console.log('--------------------------------------------------------------')
          // construct csvString
          const headerString = 'event,timestamp\n';
          const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
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
