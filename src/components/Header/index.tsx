'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Stack,
  Link,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const MENU = [
  {
    title: 'WebShell 检测',
    href: '/webShell',
  },
  {
    title: '编码转化',
    href: `/toolkit/cyberChef/Base64Encoder`,
  },
  {
    title: '加密解密',
    href: `/toolkit/cyberChef/AESEncrypt`,
  },
  {
    title: '代码格式化',
    href: `/toolkit/format/html`,
  },
  {
    title: '代码截图',
    href: `/toolkit/codeshot`,
  },
  {
    title: '其他工具',
    href: '/tools',
    target: '_blank',
  },
];

const NAV_LINK = [
  {
    title: '行业百科',
    href: '/wiki',
  },
  {
    title: '技术讨论',
    href: '/discussion',
  },
  {
    title: '在线工具',
    href: '/tools',
    target: '_blank',
    type: 'menu',
  },
  {
    title: '漏洞情报',
    href: '/vuldb',
  },
];
const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    fetch('/api/v1/user/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) => {
        setUser(data);
      });
    });
  }, []);

  return (
    <AppBar
      position='fixed'
      sx={{
        display: { xs: 'none', sm: 'block' },
        backgroundColor: '#fff',
        boxShadow: 'none',
        zIndex: 100,
      }}
    >
      <Stack
        direction='row'
        sx={{ height: 64, position: 'relative' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' alignItems='center'>
          {/* <Image
            src={logoSvg}
            alt=''
            onClick={() => {
              window.open('/', '_self');
            }}
            style={{ marginLeft: 40, marginRight: 80, cursor: 'pointer' }}
          ></Image> */}
          <Typography
            variant='h2'
            sx={{
              ml: 5,
              mr: 10,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
              color: '#000',
            }}
            onClick={() => window.open('/', '_self')}
          >
            长亭百川云
          </Typography>

          <Stack direction='row' gap={5} alignItems='center'>
            {NAV_LINK.map((item) => (
              <Box
                key={item.title}
                component={Link}
                color='#999'
                underline='none'
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (item.type === 'menu') {
                    setAnchorEl(e.currentTarget);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (item.type === 'menu') {
                    return;
                  } else {
                    window.open(item.href, '_self');
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  gap: 0.5,
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: 700,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.title}
                {item.type === 'menu' && (
                  <PlayArrowRoundedIcon
                    sx={{
                      transform: 'rotate(90deg)',
                      color: 'rgba(0,0,0,0.5)',
                      mt: '-1px',
                      fontSize: 12,
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          PaperProps={{
            sx: { mt: 1.5 },
          }}
        >
          {MENU.map((item) => (
            <MenuItem
              component={Link}
              key={item.title}
              sx={{
                width: '180px',
                fontSize: '14px',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
                },
                '&:focus': {
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => {
                setAnchorEl(null);
                window.open(item.href);
              }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>

        <Stack
          direction='row'
          alignItems={'center'}
          gap={3}
          sx={{ position: 'absolute', top: 0, bottom: 0, right: 40 }}
        >
          {user ? (
            <Button
              variant='contained'
              sx={{
                borderRadius: 1,
                height: 44,
                width: 122,
                fontSize: 14,
                boxShadow: 'none !important',
              }}
              onClick={() => {
                window.open('/console/workbench', '_self');
              }}
            >
              工作台
            </Button>
          ) : (
            <>
              <Button
                variant='outlined'
                sx={{ borderRadius: 1, height: 44, width: 122, fontSize: 14 }}
                onClick={() => {
                  window.open('/register', '_self');
                }}
              >
                立即注册
              </Button>
              <Button
                variant='contained'
                sx={{
                  borderRadius: 1,
                  height: 44,
                  width: 122,
                  fontSize: 14,
                  boxShadow: 'none !important',
                }}
              >
                登录
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
