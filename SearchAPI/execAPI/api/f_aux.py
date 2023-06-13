import sys
from io import StringIO
import contextlib

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

def executeF(mensaje):
    with stdoutIO() as s:
        try:
            exec(f"""{mensaje}""")
        except Exception as e:
            print("ERROR:", e)
    return(s.getvalue())

#print(executeF(
#"""
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
#"""
#))

#print(executeF("""\n# importar las librerias pyvo y matplotlib\nfrom pyvo.dal import tap\nfrom matplotlib import pyplot as plt\n\n# URL del servicio TAP\ntap_url = "http://dc.zah.uni-heidelberg.de/tap"\n\n# Crear una conexión con el servicio TAP\nservice = tap.TAPService(tap_url)\n\n# Construir la consulta\nquery = \'\'\'\nSELECT access_url\nFROM ivoa.obscore\nWHERE target_name = \'Jupiter\'\n  AND dataproduct_type = \'image\'\n\'\'\'\n\n# Ejecutar la consulta\nresult = service.search(query)\n\n# Obtener la URL de la imagen de Júpiter\nif len(result) > 0:\n    access_url = result[\'access_url\'][0]\n    print(access_url)\n    print("URL de la imagen de Júpiter:", access_url)\nelse:\n    print("No se encontraron imágenes de Júpiter en el espectro visible.")\n"""))
    