import { Box, Typography } from "@mui/material";
import Image from "next/image";

// pages/404.tsx
export default function Custom404() {
    return (
        <Box display={'flex'} height="80vh" flexDirection='column' alignItems='center' justifyContent={'center'}>
            <Typography variant="h2" fontWeight={700} textAlign="center" marginY={'auto'}>404 - Page Not Found</Typography>
        </Box>
    )
}