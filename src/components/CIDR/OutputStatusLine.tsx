import { Grid, Typography } from '@mui/material';

function Partial({ name, status }: { name: string; status: any }) {
  return (
    <Typography variant='caption' color='textSecondary'>
      {name}: {status?.line_count_before ?? 0}
      <abbr title='行数'> 行 </abbr>/ {status?.address_count_before ?? '0'} 个
      &nbsp;&nbsp;➟&nbsp;&nbsp;
      <b>{status?.line_count_after ?? 0}</b>
      <abbr title='行数'> 行</abbr> /{' '}
      <b>{status?.address_count_after ?? '0'} </b>个
    </Typography>
  );
}

export default function OutputStatusLine({ output }: { output: any }) {
  return (
    <Grid container direction='row' justifyContent='space-between'>
      <Grid item>
        <Partial name='IPv4' status={output?.v4} />
      </Grid>
      <Grid item>
        <Partial name='IPv6' status={output?.v6} />
      </Grid>
    </Grid>
  );
}
