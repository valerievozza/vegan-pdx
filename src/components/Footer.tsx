import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

export default function Footer() {
  return (
    <Box display={'flex'} justifyContent={'center'} gap={1}>
      <a href="https://github.com/valerievozza" target="_blank" rel="noreferrer">
        <GitHubIcon />
      </a>
      <a href="https://valerievozza.dev" target="_blank" rel="noreferrer">
        <LanguageIcon />
      </a>
    </Box>
  )
}