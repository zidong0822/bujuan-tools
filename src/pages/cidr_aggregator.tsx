import InputEditor from '@/components/CIDR/InputEditor';
import OptionsControl from '@/components/CIDR/OptionsControl';
import OutputEditor from '@/components/CIDR/OutputEditor';
import MainContent from '@/components/MainContent';
import { aggregate } from '@/pkg/cidr_aggregator';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function App() {
  const controlRef = useRef(null as any);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(undefined as any);
  const [ipKind, setIpKind] = useState('both');
  const [bogonFilter, setBogonFilter] = useState(
    undefined as 'reserved' | undefined
  );
  const toggleIpv4 = () => {
    setIpKind((prev) => {
      if (prev === 'both' || prev === 'ipv4') {
        return 'ipv6';
      } /* ipv6 */ else {
        return 'both';
      }
    });
  };
  const toggleIpv6 = () => {
    setIpKind((prev) => {
      if (prev === 'both' || prev === 'ipv6') {
        return 'ipv4';
      } /* ipv4 */ else {
        return 'both';
      }
    });
  };
  const toggleReservedFilter = () => {
    setBogonFilter((prev) => {
      if (bogonFilter === 'reserved') {
        return undefined;
      } else {
        return 'reserved';
      }
    });
  };
  const handleAggregate = async (reverse = false) => {
    setOutput(
      Object.assign(
        { reverse },
        await aggregate(input, reverse, bogonFilter === 'reserved')
      )
    );
  };
  useEffect(() => {
    output && handleAggregate(output.reverse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bogonFilter]);

  return (
    <MainContent>
      <Container component='main' sx={{ p: '0 !important' }}>
        <CssBaseline />
        <main>
          <Paper
            component='section'
            elevation={3}
            sx={{ boxShadow: 'none', border: '1px solid #dedede' }}
          >
            <Box p={2}>
              <InputEditor input={input} setInput={setInput} output={output} />
            </Box>
          </Paper>
          <Paper component='section' sx={{ boxShadow: 'none', my: 1 }}>
            <Stack direction='row'>
              <OptionsControl
                ipKind={ipKind}
                toggleIpv4={toggleIpv4}
                toggleIpv6={toggleIpv6}
                bogonFilter={bogonFilter}
                toggleReservedFilter={toggleReservedFilter}
                handleAggregate={handleAggregate}
                ref={controlRef}
              />
              {!!output && (
                <Button
                  size='small'
                  variant='outlined'
                  sx={{ ml: 2 }}
                  onClick={() => {
                    // 复制 output结果
                    navigator.clipboard
                      .writeText(
                        [
                          ipKind !== 'ipv6' && output?.v4?.ranges,
                          ipKind !== 'ipv4' && output?.v6?.ranges,
                        ]
                          .filter((v) => v)
                          .join('\n')
                      )
                      .then(() => {
                        alert('复制成功');
                      });
                  }}
                >
                  复制
                </Button>
              )}
            </Stack>
          </Paper>
          <Paper
            component='section'
            elevation={3}
            sx={{ boxShadow: 'none', border: '1px solid #dedede' }}
          >
            <Box p={2}>
              <OutputEditor ipKind={ipKind} output={output} />
            </Box>
          </Paper>
        </main>
      </Container>
    </MainContent>
  );
}

export default App;
