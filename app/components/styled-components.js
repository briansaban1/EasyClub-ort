import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, Platform} from 'react-native';
import {Colors, Dimensions} from '../constants';


export const Wrapper = styled.View``;


export const StyledSafeAreaContainer = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.body};
  flex: 1;
`;

export const SafeAreaContainer = (props) => {
  const {backgroundColor, children} = props;
  return (
    <StyledSafeAreaContainer
      forceInset={{top: 'always'}}
      backgroundColor={backgroundColor}>
      {children}
    </StyledSafeAreaContainer>
  );
};

export const Container = styled(Wrapper)`
  background-color: ${(props) => props.theme.body};
  flex: 1;
`;
export const FilterContainer = styled(Wrapper)`
  height: ${40 * Dimensions.multiplier};
  padding-left: 24px;
  padding-right: 24px;
  margin-right: auto; */
`;

export const SimpleHeader = styled(Wrapper)`
  height: ${56 * Dimensions.multiplier};
  padding-left: 24px;
  padding-right: 24px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
export const Divider = styled.View`
  height: 1px;
  background: ${Colors.border};
  margin-horizontal: ${(props) => props.marginHorizontal || 0}px;
`;
export const FlexBetweenWrapper = styled.View`
  width: 100%;
  marginTop: ${Platform.OS == 'android' ? 47 : 15};
  justify-content: space-between;
  align-items: ${({alignItems}) => alignItems || 'center'};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  flex-direction: row;
`;
export const FlexBetweenWrapper_perfil = styled.View`
  width: 100%;
  marginTop: ${Platform.OS == 'android' ? 15 : 15};
  justify-content: space-between;
  align-items: ${({alignItems}) => alignItems || 'center'};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  flex-direction: row;
`;
export const FlexBetweenWrapperReservas = styled.View`
  width: 100%;
  marginTop: ${Platform.OS == 'android' ? 14 : 14};
  justify-content: space-between;
  align-items: ${({alignItems}) => alignItems || 'center'};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  flex-direction: row;
`;
export const FlexBetweenWrapper1 = styled.View`
  width: 100%;
  marginTop: ${Platform.OS == 'android' ? 15 : 15};
  justify-content: space-between;
  align-items: ${({alignItems}) => alignItems || 'center'};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  flex-direction: row;
`;
export const FlexBetweenWrapperNew = styled.View`
  width: 100%;
  marginTop: ${Platform.OS == 'android' ? 0 : 0};
  justify-content: space-between;
  align-items: ${({alignItems}) => alignItems || 'center'};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0}px;
  flex-direction: row;
`;
export const FlexWrapper = styled.View`
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  align-items: ${({alignItems}) => alignItems || 'center'};
  flex-direction: row;
`;

export const FlexWrapperPerfil = styled.View`
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
  align-items: ${({alignItems}) => alignItems || 'flex-start'};
  flex-direction: row;
  width: 65%;
`;

export const RowView = styled.View`
  width: 100%;
  flex-direction: row;
`;
export const Space = styled.View`
  width: 100%;
  height: ${({height}) => (height || 10) * Dimensions.multiplier};
`;

export const DontGrowView = styled.View`
  flex: 0;
`;

export const MainView = styled.View`
  margin-top: ${(props) => props.marginTop || Dimensions.px15}px;
  margin-horizontal: ${(props) => props.marginHorizontal || Dimensions.px16}px;
`;

export const ActivityCardView = styled.View`
  margin-horizontal: 15;
  margin-vertical: 15;
  padding-horizontal: 15;
  padding-top: 15;
  border-radius: 8;
  background: ${(props) => props.theme.background};
`;

export const RelatedContent = styled.View`
  flex-wrap: wrap;
  flex-grow: 3;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 10;
  border-color: ${(props) => props.theme.body};
  border-bottom-width: 2;
  border-top-width: 2;
`;
export const RelatedView = styled.View`
  width: ${(Dimensions.deviceWidth - 70) / 2};
  margin-bottom: 10;
  background-color: green;
`;

export const CenterView = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CenterText = styled.Text`
  text-align: center;
  color: ${(props) => props.color || Colors.lightblue};
  letter-spacing: 0.135;
  font-size: ${(props) => (props.fontSize || 14) * Dimensions.multiplier};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
`;
export const Loader = styled.ActivityIndicator`
  margin-vertical: 10;
`;

export const GrowView = styled.View`
  flex: 1;
`;
export const InfoView = styled.View`
  flex: 1;
  padding: 8px;
`;

export const AppText = styled.Text`
  color: ${(props) => props.color || Colors.blue400};
  letter-spacing: 0.135;
  font-size: ${(props) => (props.fontSize || 14) * Dimensions.multiplier};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  opacity: ${({opacity}) => opacity || 1};
`;

export const AppTextLight = styled.Text`
  color: ${(props) => props.color || Colors.lightbackground};
  letter-spacing: 0.135;
  font-size: ${(props) => (props.fontSize || 14) * Dimensions.multiplier};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  opacity: ${({opacity}) => opacity || 1};
`;

export const BoldText = styled(AppText)`
  font-weight: 700;
  colo
`;

export const Heading1 = styled(AppText)`
  font-size: ${25 * Dimensions.multiplier}px;
  color: ${(props) => props.color || Colors.lightblue};
  font-weight: ${({fontWeight}) => fontWeight || 900};
  opacity: ${({opacity}) => opacity || 1};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0};

`;

export const Heading2 = styled(AppText)`
  font-size: ${({fontSize}) => (fontSize || 20) * Dimensions.multiplier};
  font-weight: ${({fontWeight}) => fontWeight || 500};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  color: ${(props) => props.color || Colors.lightblue};
  opacity: ${({opacity}) => opacity || 1};

`;

export const Heading3 = styled(AppText)`
  font-size: ${18 * Dimensions.multiplier};
  color: ${(props) => props.color || Colors.lightblue};
  font-weight: ${({fontWeight}) => fontWeight || 500};
  line-height: ${32 * Dimensions.multiplier}px;
  margin-top: ${({marginTop}) => marginTop || 12}px;
  margin-right: ${({marginRight}) => marginRight || 0};
  margin-bottom: ${({marginBottom}) => marginBottom || 0};
  opacity: ${({opacity}) => opacity || 1};
`;
export const Heading4 = styled(AppText)`
  font-size: ${16 * Dimensions.multiplier}px;
  font-weight: 500;
  margin-top: ${({marginTop}) => marginTop || 1};
  color: ${(props) => props.color || Colors.blue};
`;

export const Heading5 = styled(AppText)`
  font-size: ${14 * Dimensions.multiplier}px;
  font-weight: 400;
  margin-top: ${({marginTop}) => marginTop || 1};
  color: ${Colors.blue};
`;

export const Title = styled(AppText)`
  font-size: ${24 * Dimensions.multiplier}px;
  font-weight: 500;
`;

export const DisplayTitle = styled(AppText)`
  font-size: 28px;
  color: ${(props) => props.color || Colors.lightblue};
  line-height: ${28 * Dimensions.multiplier}px;
  margin-top: ${12 * Dimensions.multiplier}px;
  /* margin-bottom: ${24 * Dimensions.multiplier}px; */
  opacity: ${({opacity}) => opacity || 1};
  /* text-transform: uppercase; */
`;

export const DisplayText = styled(AppText)`
  font-size: 18px;
  color: ${(props) => props.color || Colors.lightblue};
  font-weight: ${({fontWeight}) => fontWeight || 500};
  line-height: ${28 * Dimensions.multiplier}px;
  margin-top: ${12 * Dimensions.multiplier}px;
  margin-bottom: ${24 * Dimensions.multiplier}px;
  opacity: ${({opacity}) => opacity || 1};
`;

export const BodyText = styled.Text`
  font-size: 18px;
  /* letter-spacing: 20; */
  /* font-weight: ${({fontWeight}) => fontWeight || 500}; */
  color: ${(props) => props.theme.active};
  opacity: ${(props) => props.opacity || 1};
  line-height: 32px;
  /* margin-bottom: 6; */
  /* border-bottom-color: ${(props) => Colors.lightblue}; */
  /* font-weight: 700; */
`;

export const CardContent = styled.View`
  margin-top: ${12 * Dimensions.multiplier}px;
  /* margin-bottom: ${12 * Dimensions.multiplier}px; */
`;
