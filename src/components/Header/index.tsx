'use client';

import { ALL_TOOLKIT_LIST, SECURITY_HOLE, TOOLKIT_LIST } from './toolkit';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  AppBar,
  Box,
  Button,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDebounceFn } from 'ahooks';
import NextLink from 'next/link';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoggedInView from './loggedInView';

const NAV_LINK = [
  {
    title: '技术讨论',
    href: '/discussion',
  },
  {
    title: '长亭漏洞情报库',
    href: '/vuldb',
    target: '_blank',
  },
  {
    title: 'IP 威胁情报',
    href: '/ip-intelligence',
    target: '_blank',
  },

  {
    title: '在线工具',
    href: '/tools',
    target: '_blank',
    type: 'menu',
  },
];

const PATH_TO_TEXT = {
  discussion: '技术讨论',
  product: '产品详情',
  vendors: '厂商详情',
  blog: '文章详情',
};

const ToolItem = ({ data }: any) => {
  return (
    <Stack gap={2}>
      <Typography
        variant='h2'
        sx={{ fontSize: 14, color: '#000', fontWeight: 600 }}
      >
        {data.name}
      </Typography>
      {data.tools.map((tool: any) => (
        <Box
          key={tool.name}
          component={Link}
          href={tool.url}
          target='_blank'
          sx={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.8)',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {tool.name}
        </Box>
      ))}
    </Stack>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [afterKeyword, setAfterKeyword] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectEl, setSelectEl] = useState<null | HTMLElement>(null);
  const [toolList, setToolList] = useState<any[]>(TOOLKIT_LIST);
  const [user, setUser] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const open = Boolean(anchorEl);

  const selectOpen = Boolean(selectEl);
  const router = useRouter();

  const { run: runSearch } = useDebounceFn(
    (k: string) => {
      handleSearch(k.trim());
    },
    { wait: 500 }
  );

  useEffect(() => {
    fetch('/api/v1/user/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) => {
        if (data.code === 0) {
          setUser(data.data);
        }
      });
    });
  }, []);

  const handleSearch = (k: string) => {
    if (k === '') {
      setToolList(TOOLKIT_LIST);
      setAfterKeyword(k);
      return;
    }
    const toolList = ALL_TOOLKIT_LIST.reduce((prev, cur) => {
      const tools = cur.tools.filter((item) =>
        item.name.toUpperCase().includes(k.toUpperCase())
      );
      if (tools.length) {
        prev.push({
          name: cur.name,
          tools,
        });
      }
      return prev;
    }, [] as any[]);

    setToolList(toolList);
    setAfterKeyword(k);
  };

  useEffect(() => {
    runSearch(keyword);
  }, [keyword]);

  const pathText =
    PATH_TO_TEXT[pathname.split('/')[1] as keyof typeof PATH_TO_TEXT];

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#fff',
        transition: 'background-color 0.2s',
        zIndex: 100,
        boxShadow:
          '0px 2px 6px 0px rgba(0,0,0,0.1), 0px 2px 6px 0px rgba(218,220,224,0.5)',
        // ...headerStyle,
      }}
    >
      <Stack
        justifyContent='center'
        sx={{
          height: 64,
          position: 'relative',
          background: '#fff',
          display: { xs: 'flex', sm: 'none' },
        }}
      >
        <Typography
          variant='h2'
          sx={{
            ml: 2,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 700,
            color: '#000',
          }}
          onClick={() => {
            router.push('/');
          }}
        >
          长亭百川云 {pathText ? ` - ${pathText}` : ''}
        </Typography>
      </Stack>

      <Stack
        direction='row'
        sx={{
          height: 64,
          position: 'relative',
          display: { xs: 'none', sm: 'flex' },
        }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' alignItems='center'>
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
            onClick={() => {
              router.push('/');
            }}
          >
            长亭百川云
          </Typography>

          <Stack direction='row' gap={5} alignItems='center'>
            {NAV_LINK.map((item) => (
              <Link
                key={item.title}
                component={NextLink}
                color='#999'
                underline='none'
                href={item.href}
                // onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                //   if (item.type === 'menu') {
                //     setAnchorEl(e.currentTarget);
                //   }
                // }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (item.type === 'menu') {
                    e.preventDefault();
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                  }
                  if (item.type === 'select') {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectEl(e.currentTarget);
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  gap: 0.5,
                  color:
                    (open && item.title === '在线工具') ||
                    (selectOpen && item.title === '安全情报') ||
                    pathname === item.href
                      ? 'primary.main'
                      : 'rgba(0,0,0,0.5)',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.title}
                {(item.type === 'menu' || item.type === 'select') && (
                  <PlayArrowRoundedIcon
                    sx={{
                      transition: 'transform 0.3s',
                      transform:
                        (open && item.title === '在线工具') ||
                        (selectOpen && item.title === '安全情报')
                          ? 'rotate(-90deg)'
                          : 'rotate(90deg)',
                      color:
                        (open && item.title === '在线工具') ||
                        (selectOpen && item.title === '安全情报')
                          ? 'primary.main'
                          : 'rgba(0,0,0,0.5)',
                      mt: '-1px',
                      fontSize: 12,
                    }}
                  />
                )}
              </Link>
            ))}
          </Stack>
        </Stack>
        <Menu
          id='basic-menu'
          anchorEl={selectEl}
          open={Boolean(selectEl)}
          onClose={() => {
            setSelectEl(null);
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ mt: 2 }}
        >
          {SECURITY_HOLE.map((item) => (
            <MenuItem
              key={item.name}
              component={Link}
              href={item.url}
              target='_blank'
              sx={{
                minWidth: 116,
                fontSize: 14,
                color: '#000',
                pr: 3,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          // sx={{ position: 'static' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '100%',
              maxHeight: 700,
              ml: -2,
              mt: 2,
              py: 3,
              px: 9,
              boxShadow: ' 0px 10px 20px 0px rgba(0,28,85,0.04)',
            },
            onMouseLeave: () => {
              // setAnchorEl(null);
            },
          }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
            gap={3}
          >
            <TextField
              sx={{ mb: 3, flex: 1 }}
              autoComplete='off'
              variant='standard'
              placeholder='搜索工具'
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant='contained'
              size='small'
              href='/toolkit'
              sx={{ boxShadow: 'none !important' }}
            >
              更多工具
            </Button>
          </Stack>

          <Stack direction='row'>
            {afterKeyword === '' && toolList.length === 10 && (
              <>
                <Stack gap={6} sx={{ width: '12.5%' }}>
                  <ToolItem data={toolList[0]}></ToolItem>
                  <ToolItem data={toolList[1]}></ToolItem>
                </Stack>
                <Stack gap={6} sx={{ width: '12.5%' }}>
                  <ToolItem data={toolList[2]}></ToolItem>
                  <ToolItem data={toolList[3]}></ToolItem>
                </Stack>
              </>
            )}

            {toolList
              .slice(afterKeyword === '' && toolList.length === 10 ? 4 : 0)
              .map((item) => (
                <Box sx={{ width: '12.5%' }} key={item.name}>
                  <ToolItem data={item}></ToolItem>
                </Box>
              ))}
          </Stack>
          {toolList.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                backgroundColor: '#fff',
                borderRadius: 2,
              }}
            >
              <Box
                component='img'
                sx={{ width: 300 }}
                src='/empty.png'
                alt='empty'
              />
              <Typography sx={{ fontWeight: 600 }}>
                未找到你查询的内容
              </Typography>
            </Box>
          )}
        </Popover>

        <Stack
          direction='row'
          alignItems={'center'}
          gap={3}
          sx={{ position: 'absolute', top: 0, bottom: 0, right: 40 }}
        >
          {user ? (
            <>
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
              <LoggedInView user={user} />
            </>
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
                onClick={() => {
                  window.open('/login', '_self');
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
