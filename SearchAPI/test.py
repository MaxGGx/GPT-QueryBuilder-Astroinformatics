# importar las librerias pyvo y matplotlib
#from pyvo.dal import tap
#from matplotlib import pyplot as plt

# URL del servicio TAP
#tap_url = "http://dc.zah.uni-heidelberg.de/tap"

# Crear una conexión con el servicio TAP
#service = tap.TAPService(tap_url)

# Construir la consulta
#query = '''
#SELECT access_url
#FROM ivoa.obscore
#WHERE target_name = 'Jupiter'
#  AND dataproduct_type = 'image'
#'''

# Ejecutar la consulta
#result = service.search(query)

# Obtener la URL de la imagen de Júpiter
#if len(result) > 0:
#    access_url = result['access_url'][0]
#    print(access_url)
#    print("URL de la imagen de Júpiter:", access_url)
#else:
#    print("No se encontraron imágenes de Júpiter en el espectro visible.")


#from astropy.coordinates import SkyCoord
#from astroquery.skyview import SkyView

# Coordenadas de Plutón (por ejemplo, Ascensión Recta y Declinación)
#coord = SkyCoord.from_name('Pluto')

# Obtener la URL de la imagen de Plutón utilizando el servicio SkyView
#url = SkyView.get_image_list(position=coord, survey='DSS', pixels=200)

# Imprimir la URL de la imagen de Plutón
#print(f"URL de la imagen de Plutón: {url[0]}")













