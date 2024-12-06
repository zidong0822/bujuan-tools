'use client';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {
  Avatar,
  Link,
  Stack,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import React, { useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Badge,
  IdCard,
  IdInfo,
  InfoCard,
  Row,
  TagRow,
  CopyIcon,
  SpaceIcon,
  OrderIcon,
  PersonIcon,
  PromotionIcon,
  LogoutIcon,
} from './components';
import alert from '@/components/Alert';
export interface ProfilePanelProps {
  userInfo: any | null;
  verified: boolean;
}

const ProfilePanel: React.FC<ProfilePanelProps> = (props) => {
  const { userInfo, verified } = props;
  const handleLogout = () => {
    fetch('/api/v1/user/signout', {
      credentials: 'include',
    }).then(() => {
      window.location.reload();
    });
  };

  const toLink = (link: string) => () => {
    window.open(link, '_target');
  };

  const onCopy = useCallback(() => {
    alert.success('用户ID已复制到剪贴板');
  }, []);

  const OPT_LIST = [
    {
      name: '个人中心',
      icon: <PersonIcon sx={{ fontSize: 16 }} />,
      link: '/console/personal/base',
    },
    {
      name: '空间管理',
      icon: <SpaceIcon sx={{ fontSize: 16 }} />,
      link: '/console/space/base',
    },
    {
      name: '推广大使',
      icon: <PromotionIcon sx={{ fontSize: 16 }} />,
      link: '/console/personal/promotion',
    },
    {
      name: '订单管理',
      icon: <OrderIcon sx={{ fontSize: 16 }} />,
      link: '/console/space/order',
    },
  ];

  return (
    <InfoCard>
      <IdCard>
        <IdInfo>
          <Avatar
            src={userInfo?.head_img_url ?? userInfo?.nickname}
            sx={{ width: 40 }}
          />
          <Stack>
            <Box
              sx={{
                fontSize: '14px',
                textOverflow: 'ellipsis',
                maxWidth: '10rem',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                color: '#000',
              }}
              title={userInfo?.nickname}
            >
              {userInfo?.nickname}
            </Box>
            <Row sx={{ gap: '8px' }}>
              <Box
                sx={{
                  fontSize: '14px',
                  textOverflow: 'ellipsis',
                  maxWidth: '10rem',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                {userInfo?.id}
              </Box>

              <CopyToClipboard
                text={userInfo?.id?.toString() || ''}
                onCopy={onCopy}
              >
                <CopyIcon
                  sx={{
                    width: '12px',
                    color: 'primary.main',
                    cursor: 'pointer',
                  }}
                />
              </CopyToClipboard>
            </Row>
          </Stack>
        </IdInfo>
        <TagRow>
          <Badge
            state={verified ? 'success' : 'warning'}
            sx={{
              py: '2px',
              color: verified ? 'success.main' : 'warning.main',
            }}
          >
            {verified ? (
              <CheckCircleRoundedIcon
                sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }}
              />
            ) : (
              <ErrorRoundedIcon sx={{ fontSize: 14, mr: 0.5 }} />
            )}
            {verified ? '已认证' : '未实名认证'}
          </Badge>
          {!verified && (
            <Link
              underline='none'
              sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 400,
                fontSize: '12px',
              }}
              onClick={toLink('/console/personal')}
            >
              去认证
            </Link>
          )}
        </TagRow>
      </IdCard>

      <Box sx={{ borderBottom: '1px dashed #EEEEEE', mb: 2.5 }}></Box>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          py: 0,
          bgcolor: 'background.paper',
        }}
      >
        {OPT_LIST.map((item) => {
          return (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                height: 40,
                borderRadius: '4px',
                marginBottom: '4px',
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'rgba(32,108,255,0.1)',
                },
              }}
            >
              <ListItemButton
                sx={{
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
                onClick={() => {
                  window.open(item.link, '_target');
                }}
                dense
              >
                <ListItemIcon sx={{ minWidth: 34 }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: '#000' }} primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem
          disablePadding
          sx={{
            height: 40,
            borderRadius: '4px',
            marginBottom: '4px',
            transition: 'background 0.3s',
            '&:hover': {
              background: 'rgba(246,78,84,0.06)',
            },
          }}
        >
          <ListItemButton
            onClick={handleLogout}
            dense
            sx={{
              '&:hover': {
                background: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 34 }}>
              <LogoutIcon sx={{ fontSize: 16, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }} primary='退出' />
          </ListItemButton>
        </ListItem>
      </List>
    </InfoCard>
  );
};

export default ProfilePanel;
