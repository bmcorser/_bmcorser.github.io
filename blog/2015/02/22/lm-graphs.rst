Graphing sensor data with Python
################################
|

Doing the library dance with to draw graphs of what’s going on inside the box
whilst writing as little of my own code as possible.

.. figure:: /assets/images/lm-graphs.png
            :class: full

To cook up a graph like the one above, the ingredients are as follows:

 - lm-sensors_: Standard issue C library for gathering information from the
   hardware.
 - Py3Sensors_: Python bindings for the above, making the C routines available
   at a higher-level.
 - SQLAlchemy_: I don’t touch a database without it.
 - Pandas_: Magic library for all sorts of data-munging tasks. Here we just use
   it to resample timeseries data and interpret annotated Numpy arrays.
 - SciPy_: Giant, high-performace library for doing science. It’s only used here for the `Butterworth filter`_.
 - plot.ly_: Graph-rendering service. A touch prettier than vanilla matplotlib.

.. _lm-sensors: http://www.lm-sensors.org/
.. _Py3Sensors: https://bitbucket.org/gleb_zhulik/py3sensors
.. _SQLAlchemy: http://www.sqlalchemy.org/
.. _Pandas: http://pandas.pydata.org/
.. _SciPy: http://www.scipy.org/
.. _`Butterworth filter`: http://nbviewer.ipython.org/github/demotu/BMC/blob/master/notebooks/DataFiltering.ipynb#Butterworth-filter
.. _plot.ly: https://plot.ly/

The final blend of the ingredients above is available `on GitHub`_, what
follows is some brief documentation.

.. _`on GitHub`: https://github.com/bmcorser/lm-graphs

Setting up
==========

Because the idea of this project was to write as little code as possible, the
dependencies are heavy. The associated virtualenv is over 300Mb on my box, you
have been warned.

First, install lm-sensors. It's available from the Ubuntu repositories.

Clone the repo mentioned above. If you don’t have them already, set the Python
deps to install. Go away and make a cup of tea, it will take a while.

You'll also need sqlite_, unless you intend to use a more serious database.

.. _sqlite: http://www.sqlite.org/

.. code-block:: shell

    $ git clone https://github.com/bmcorser/lm-graphs.git
    $ cd lm-graphs
    $ pip install -r requirements.txt

`:coffee:`

Recording some data
===================
We can’t draw a graph

Just like snowflakes, all computers are different. You need to figure out which
sensors you have available and which of those you interested in. Run
``sensors`` and you’ll get some output like this:


.. code-block:: plain

    it8721-isa-0290
    Adapter: ISA adapter
    in0:          +2.81 V  (min =  +0.84 V, max =  +1.45 V)  ALARM
    in1:          +2.83 V  (min =  +2.41 V, max =  +2.56 V)  ALARM
    in2:          +0.83 V  (min =  +0.24 V, max =  +0.25 V)  ALARM
    +3.3V:        +3.31 V  (min =  +5.69 V, max =  +1.58 V)  ALARM
    in4:          +1.54 V  (min =  +0.61 V, max =  +2.00 V)
    in5:          +2.51 V  (min =  +1.78 V, max =  +0.92 V)  ALARM
    in6:          +1.73 V  (min =  +1.91 V, max =  +1.26 V)  ALARM
    3VSB:         +5.09 V  (min =  +5.23 V, max =  +3.12 V)  ALARM
    Vbat:         +3.34 V
    fan1:        2419 RPM  (min =   80 RPM)
    fan2:        1220 RPM  (min =   15 RPM)
    fan3:           0 RPM  (min =   10 RPM)  ALARM
    temp1:        +32.0°C  (low  = -124.0°C, high = -51.0°C)  ALARM  sensor = thermistor
    temp2:        +26.0°C  (low  = +104.0°C, high = -87.0°C)  ALARM  sensor = thermistor
    temp3:       -128.0°C  (low  = +16.0°C, high = +49.0°C)  sensor = disabled
    intrusion0:  OK

    fam15h_power-pci-00c4
    Adapter: PCI adapter
    power1:       80.10 W  (crit = 125.19 W)

    k10temp-pci-00c3
    Adapter: PCI adapter
    temp1:        +21.1°C  (high = +70.0°C)
                           (crit = +90.0°C, hyst = +87.0°C)

From this output we can see which sensors are disabled or not giving any
readings (see ``temp3`` and ``fan3`` on the ISA adapter). We can also see that
the fan, voltage and temperature sensors are for different types of information
won’t make sense graphed together.

In the graph at the top of the post, I graphed ``temp1`` and ``temp2`` from the
ISA adapter and ``temp1`` from the PCI adapter.

