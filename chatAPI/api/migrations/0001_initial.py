# Generated by Django 4.2.1 on 2023-05-25 06:13

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('fecha_chat', models.CharField(max_length=50, verbose_name='fecha inicio chat')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Mensajes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('mensaje', models.TextField(verbose_name='Mensaje')),
                ('usuario', models.CharField(max_length=100, verbose_name='User')),
                ('id_chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.chat')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]