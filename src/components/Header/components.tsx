'use client';
import {
  Side_Margin,
  primary,
  primaryClick,
  primaryHover,
  primaryLight,
  primaryLightGradient,
} from '@/constant';
import {
  Avatar as MuiAvatar,
  Stack,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import React from 'react';
import defaultAvatar from '@/asset/img/default_avatar.png';

export const ProfileComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  height: '100%',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'end',
  },
}));

export const ProfileCardComponent = styled(Stack)(() => ({}));

export const InfoCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    height: '100%',
  },
}));

export const IdCard = styled(Stack)(() => ({
  backgroundPositionY: 'center',
  backgroundPositionX: 'right',
  backgroundSize: '60%',
  backgroundRepeat: 'no-repeat',
  minWidth: '320px',
}));

export const IdInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

export const Row = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const TagRow = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  gap: '8px',
  marginLeft: '60px',
  marginTop: '8px',
  marginBottom: '24px',
  '& > svg': {
    fill: primary,
  },
}));

export const FlexRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const Badge = styled('div', {
  shouldForwardProp: (prop) => prop !== 'state',
})<{ state: 'warning' | 'success' }>(({ state }) => ({
  display: 'flex',
  padding: '0 10px',
  borderRadius: '2px',
  alignItems: 'center',
  fontSize: '12px',
  ...(state === 'success' && {
    backgroundColor: primaryLight,
    color: primary,
  }),
  ...(state === 'warning' && {
    backgroundColor: '#FFF8E5',
    color: '#FFBF00',
  }),
}));

export const PanelMenu = styled('div')(() => ({
  // display: 'grid',
  // gridTemplateColumns: '1fr 1fr',
  // gap: '16px',
}));

export const PanelMenuItem = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  backgroundImage: primaryLightGradient,
  alignItems: 'center',
  padding: '0px 12px',
  cursor: 'pointer',
}));

export const PanelFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0px 14px 24px 14px',
  [theme.breakpoints.down('sm')]: {
    marginTop: 'auto',
  },
}));

export const PanelHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: `${parseInt(Side_Margin) / 2}% ${Side_Margin}`,
}));

export const WorkbenchButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '102px',
  height: '30px',
  cursor: 'pointer',
  color: '#fff',
  borderRadius: '4px',
  backgroundColor: primary,
  '&:hover': {
    backgroundColor: primaryHover,
  },
  '&:active': {
    backgroundColor: primaryClick,
  },
});

export const OrgCard = styled(FlexRow)(() => ({
  backgroundColor: 'transparent',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  padding: '12px',
  '&:hover': {
    backgroundColor: '#52C41A10',
    transition: 'all 0.2s ease-in-out',
    '& > div > div': {
      color: primary,
      transition: 'all 0.2s ease-in-out',
    },
    '& > div > div > div': {
      color: primary,
      transition: 'all 0.2s ease-in-out',
    },
  },
}));

export const OrgIcon = styled(MuiAvatar)(() => ({
  width: '34px',
  height: '34px',
  fontSize: '16px',
}));

const AvatarWrap = styled(Image)(({ theme }) => {
  return {
    borderRadius: '50%',
    display: 'block',
  };
});

export const Avatar = ({ src, size = 20 }: { src?: string; size: number }) => {
  return (
    <AvatarWrap
      src={src || defaultAvatar}
      alt='头像'
      width={size}
      height={size}
    />
  );
};

export const CopyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M313.20746667 87.25390222a31.82136889 31.82136889 0 0 0-31.82136889 31.82136889v89.56586667h429.33361777c57.81731555 0 104.71196445 46.82183111 104.71196445 104.63914667v429.33361777h89.49304889a31.89418667 31.89418667 0 0 0 31.82136889-31.89418667V119.07527111a31.89418667 31.89418667 0 0 0-31.82136889-31.82136889H313.20746667z m502.22421333 728.17777778v89.49304889c0 57.81731555-46.89464889 104.63914667-104.71196445 104.63914666H119.07527111a104.71196445 104.71196445 0 0 1-104.63914666-104.63914666V313.20746667c0-57.81731555 46.82183111-104.71196445 104.63914666-104.71196445h89.56586667V119.07527111c0-57.81731555 46.82183111-104.63914667 104.63914667-104.63914666h591.64444444c57.81731555 0 104.63914667 46.82183111 104.63914666 104.63914666v591.64444444c0 57.81731555-46.82183111 104.71196445-104.63914666 104.71196445h-89.56586667zM119.07527111 281.38609778a31.82136889 31.82136889 0 0 0-31.82136889 31.89418667v591.64444444c0 17.54908445 14.27228445 31.82136889 31.82136889 31.82136889h591.64444444a31.89418667 31.89418667 0 0 0 31.89418667-31.82136889V313.20746667a31.89418667 31.89418667 0 0 0-31.89418667-31.89418667H119.07527111z'
        p-id='3406'
      ></path>
    </SvgIcon>
  );
};

export const PersonIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M506.95130075 149.50339318a129.47971792 129.47971792 0 1 0 0 258.95943585 129.47971792 129.47971792 0 0 0 0-258.95943585zM273.70139497 278.98311111a233.01688889 233.01688889 0 1 1 466.03377778 0 233.01688889 233.01688889 0 0 1-466.03377778 0z m94.99321836 414.22635614c-94.21649541 0-172.66551467 0-172.66551466 98.41079942v82.87634015h621.37837036V791.62026667c0-98.4884717-78.44901925-98.41079941-172.66551466-98.41079942H368.69461333zM92.5696 791.62026667C92.5696 637.20774163 216.301568 589.6722963 368.84995792 589.6722963H644.81962667c152.47071763 0 276.28035792 47.53544533 276.28035792 201.94797037v139.81013333c0 25.70953008-20.73850311 46.60337778-46.137344 46.60337778h-736.33336889a46.37036089 46.37036089 0 0 1-46.0596717-46.60337778v-139.81013333z'
        p-id='3830'
      ></path>
    </SvgIcon>
  );
};

export const OrderIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M652.5868563 30.43176297c24.07841185 0 47.22475615 9.55369245 64.23498903 26.64159762l172.58784237 173.05387616c17.01023289 17.01023289 26.48625303 40.00123259 26.48625305 64.00197214v642.50523496a45.28294875 45.28294875 0 0 1-45.28294875 45.28294874H145.61977837a45.28294875 45.28294875 0 0 1-45.28294874-45.28294874V75.7147117c0-25.01047941 20.27246933-45.28294875 45.28294874-45.28294873h507.04475022z m-35.7292563 104.7022554H203.7963283v740.4500006h608.56244148v-544.48279705a44.35088118 44.35088118 0 0 0-12.97127348-31.3796077L648.2372077 148.18296415a44.35088118 44.35088118 0 0 0-31.3796077-13.04894578zM530.7966957 596.81814755c12.42756741 0 22.60263822 10.09739852 22.60263822 22.60263823v55.69103644c0 12.42756741-10.09739852 22.60263822-22.60263822 22.60263823H326.90691792a22.68031052 22.68031052 0 0 1-22.68031051-22.60263823v-55.69103644c0-12.42756741 10.09739852-22.60263822 22.68031051-22.60263823h203.88977778z m158.52915675-238.53162192c12.5052397 0 22.68031052 10.09739852 22.68031052 22.60263822v57.32215467c0 12.5052397-10.09739852 22.68031052-22.68031052 22.68031051H326.90691792a22.68031052 22.68031052 0 0 1-22.68031051-22.68031051v-57.32215467c0-12.42756741 10.09739852-22.60263822 22.68031051-22.60263822h362.41893453z'
        p-id='3972'
      ></path>
    </SvgIcon>
  );
};

export const PromotionIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M740.06528 102.18154667a72.81777778 72.81777778 0 0 1 61.16693333 33.42336l196.53518222 305.32494222A72.81777778 72.81777778 0 0 1 986.04373333 533.84533333l-427.73162666 396.34716445a72.81777778 72.81777778 0 0 1-99.03217778 0L30.89294222 533.69969778a72.81777778 72.81777778 0 0 1-11.86929777-92.69703111l195.15164444-305.17930667a72.81777778 72.81777778 0 0 1 61.38538666-33.56899555h464.57742223z m-8.00995555 87.38133333h-448.55751112L98.97756445 477.77564445l409.67281777 379.16216888 408.87182223-379.01653333-185.53969778-288.3584z'
        p-id='4254'
      ></path>
      <path
        d='M633.984 475.584a38.4 38.4 0 0 1 60.224 47.616c-58.56 74.112-120.128 113.28-185.344 113.28-65.28 0-126.528-39.232-184.32-113.472a38.4 38.4 0 0 1 60.608-47.168c44.608 57.28 86.016 83.84 123.712 83.84 37.76 0 79.744-26.624 125.12-84.096z'
        p-id='4255'
      ></path>
    </SvgIcon>
  );
};

export const LogoutIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M890.176 497.536l-158.72-158.656a19.904 19.904 0 0 0-28.16 0l-32 32.064a19.904 19.904 0 0 0 0 28.16l69.952 70.016H422.208a19.904 19.904 0 0 0-19.904 19.904v45.44c0 10.944 8.896 19.84 19.84 19.84h318.912l-69.952 70.016a19.904 19.904 0 0 0 0 28.16l32.064 32.064a19.904 19.904 0 0 0 28.16 0l126.72-126.72 32.128-32.064a19.904 19.904 0 0 0 0-28.16zM616.832 128H187.776A59.776 59.776 0 0 0 128 187.776v647.936c0 33.024 26.752 59.776 59.776 59.776h429.056a59.776 59.776 0 0 0 59.712-59.776v-84.096a19.904 19.904 0 0 0-19.904-19.904h-43.2a19.904 19.904 0 0 0-19.84 19.904v32c0 29.44 0 29.44-29.952 29.44H240.064c-29.888 0-29.888 0-29.888-29.824V239.552c0-29.952-0.064-29.888 29.888-29.888h323.584c29.888 0 29.888 0.256 29.888 29.44v32.96c0 11.008 8.96 19.904 19.904 19.904h43.2c11.008 0 19.904-8.896 19.904-19.84V187.712A59.776 59.776 0 0 0 616.832 128z'
        p-id='4536'
      ></path>
    </SvgIcon>
  );
};

export const SpaceIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 1024 1024' width='20' height='20' {...props}>
      <path
        d='M935.21692445 338.54577778c8.51968 4.87879111 13.68974222 13.83537778 13.68974222 23.66577777v402.46385778c0 11.94211555-6.5536 22.9376-17.11217778 28.83584L588.96839111 984.07537778l-5.24288 2.18453333-5.53415111 1.16508444a27.30666667 27.30666667 0 0 1-29.78247111-27.23384889V578.11626666a54.61333333 54.61333333 0 0 1 27.23384889-47.33155555l332.26752-192.23893333a27.30666667 27.30666667 0 0 1 10.92266667-3.49525334h5.60696888a27.30666667 27.30666667 0 0 1 10.77703112 3.49525334zM115.65283555 337.45351111l331.90343112 184.73870222a54.61333333 54.61333333 0 0 1 28.03484444 47.69564445v389.72074666a27.30666667 27.30666667 0 0 1-24.39395556 27.16103111h-5.67978666a27.30666667 27.30666667 0 0 1-10.77703111-3.42243555l-342.75328-195.87982222A33.64181333 33.64181333 0 0 1 75.09333333 758.92280888v-397.58506666a27.30666667 27.30666667 0 0 1 24.17550222-27.08821334h5.6069689c3.71370667 0.29127111 7.42741333 1.45635555 10.7770311 3.2768zM854.24355555 479.01127111L643.072 601.12668444v244.52209778l211.09873778-117.38225778V479.01127111zM169.75644445 475.80728888l-0.07281778 247.07072 211.17155555 120.58624V593.33518222L169.75644445 475.80728888zM533.84533333 27.83232l335.90840889 184.59306666a27.30666667 27.30666667 0 0 1 0.43690667 47.62282667L545.86026667 445.51509333a54.61333333 54.61333333 0 0 1-52.93852445 0.72817778L155.92106667 265.65518222a27.30666667 27.30666667 0 0 1-0.29127112-48.05973334l345.52035556-189.76312888a34.15153778 34.15153778 0 0 1 32.768 0z m-16.31118222 98.95936l-207.53066666 114.03264 208.0403911 111.48401778 200.83143112-114.90645334-201.34115556-110.61020444z'
        p-id='4817'
      ></path>
    </SvgIcon>
  );
};
