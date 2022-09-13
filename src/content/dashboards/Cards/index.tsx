import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Footer from 'src/components/Footer';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CardActionArea } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Cards() {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Helmet>
        <title>Almacen Cadena El Cig</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton='Inicio'
          heading="Cadena Cig"
          subHeading="Almacen Bodega"
          docs='/overview'/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={12} spacing={3}>
            <Card>
              <CardHeader title="BIENVENIDOS"/>
              <Divider />
              <CardContent>
                <Card sx={{ minWidth: 150 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Almacen Cadena el Cig cuenta con rutas en el oriente antioqueño
                      prestando sus servicios de manera consecutiva por mas de 20 años llevando producto y servicio de calidad 
                      a los hogares del oriente antioqueño.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} spacing={3}>
            <Card>
              <CardHeader title="Nuestros Productos"/>
              <Divider />
            <CardContent>
              <Grid 
                  item xs={6}
                  >
                <Card sx={{ maxWidth: 345}}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/static/images/placeholders/covers/bordada.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Cortina Giraltex Bordada
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Juego de cortinas contiene velo suizo, el par de cortinas con 
                        cenefas incluidas y sus respectivas amarraderas.
                        ¡Excelente para combinar en tu sala !
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </CardContent>

            <CardContent>
            <Grid 
              item xs={6}
              >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/static/images/placeholders/covers/china.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Cortinas Chinas 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Juego de cortinas chinas estampadas, contiene dos 
                       cortinas hermosas y sus respectivas amarraderas.
                      ¡Excelente para combinar en tu sala !
                    </Typography>
                  </CardContent>
                </CardActionArea>
               </Card>
              </Grid>
            </CardContent>

            <CardContent>
            <Grid 
              item xs={6}
              justifyContent="right"
              alignItems="stretch">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/static/images/placeholders/covers/brocado.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Unifaz Doble Brocado
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tendido para cama doble unifaz, garantias de color e imprefectos
                      un tendido practico y facil de manipular a la hora del lavado, contiene
                      el tendido y las dos fundas de almohadas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
               </Card>
              </Grid>
            </CardContent>

            <CardContent>
            <Grid 
              item xs={6}
              justifyContent="right"
              alignItems="stretch">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/static/images/placeholders/covers/ovejera.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Cobija Ovejera
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tendido para cama doble unifaz, garantias de color e imprefectos
                      un tendido practico y facil de manipular a la hora del lavado, contiene
                      el tendido y las dos fundas de almohadas.
                    </Typography>
                  </CardContent>
                </CardActionArea>
               </Card>
              </Grid>
            </CardContent>
            

          </Card>
        </Grid>
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Cards;
