from django.test import TestCase
from .models import Task


# Create your tests here.
"""

clase  para las pruebas del modelo task
para correr las prueba es con el comando:
python manage.py test

"""

class TaskTestCase(TestCase):

   """
   metodo constructor en el que se crean las tareas
   """
   def setUp(self):
      Task.objects.create(title="ir al gimnasio", completed=False)
      Task.objects.create(title="recoger la ropa", completed=False)

   """
   caso de prueba en donde se comprueba que cada tarea 
   anteriomente creada no se inice en estado completado 
   """

   def test_is_not_completed(self):
      task1 = Task.objects.get(title="ir al gimnasio")
      self.assertEqual(task1.completed, False)
      
      task2 = Task.objects.get(title="recoger la ropa")
      self.assertEqual(task2.completed, False)


   """
   caso de prueba en donde se comprueba que el titulo 
   de tarea cada tarea anteriomente creada sea de tipo string
   """

   def test_title_is_string(self):
      task1 = Task.objects.get(title="ir al gimnasio")
      self.assertTrue(isinstance(task1.title, str))

      task2 = Task.objects.get(title="recoger la ropa")
      self.assertTrue(isinstance(task1.title, str))


      








