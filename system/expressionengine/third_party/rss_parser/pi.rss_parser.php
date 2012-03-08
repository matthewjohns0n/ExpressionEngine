<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
Copyright (C) 2011 EllisLab, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
ELLISLAB, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of EllisLab, Inc. shall not be
used in advertising or otherwise to promote the sale, use or other dealings
in this Software without prior written authorization from EllisLab, Inc.
*/

$plugin_info = array(
	'pi_name'			=> 'RSS Parser',
	'pi_version'		=> '1.0',
	'pi_author'			=> 'EllisLab Development Team',
	'pi_author_url'		=> 'http://ellislab.com/',
	'pi_description'	=> 'Retrieves and Parses RSS/Atom Feeds',
	'pi_usage'			=> Rss_parser::usage()
);

Class Rss_parser {

	private $cache_name = 'rss_cache';

	public function __construct()
	{
		$this->EE 	=& get_instance();

		// Fetch Parameters and set defaults
		$url 		= $this->EE->TMPL->fetch_param('url');
		$limit 		= (int) $this->EE->TMPL->fetch_param('limit', 10);
		$offset 	= (int) $this->EE->TMPL->fetch_param('offset', 0);
		$refresh 	= (int) $this->EE->TMPL->fetch_param('refresh', 180);
		
		// Bring in SimplePie
		require_once(PATH_THIRD.'rss_parser/libraries/SimplePieAutoloader.php');
		require_once(PATH_THIRD.'rss_parser/libraries/idn/idna_convert.class.php');

		$feed = new SimplePie();
		$feed->set_feed_url($url);

		// Establish the cache
		$this->_check_cache();
		$feed->set_cache_location(APPPATH.'cache/'.$this->cache_name.'/');
		$feed->set_cache_duration($refresh * 60); // Get parameter to seconds

		// No offset function, so need to offset manually
		// makes sure we get enough items
		$feed->set_item_limit($limit + $offset); 

		// Check to see if the feed was initialized, if so, deal with the type
		$success = $feed->init();
		$feed->handle_content_type();

		// Any errors?
		if ($feed->error())
		{
			// $feed->error();
		}

		if ($success)
		{
			// var_dump($feed->get_items());
			// TODO: Handle both feed_ and channel_
			// $feed->get_title();
			// $feed->get_link();
			// $feed->get_copyright();
			// $feed->get_description();
			// $feed->get_language()
			// TODO: For logo handle both image_ and logo_

			foreach ($feed->get_items() as $index => $item)
			{
				// $item->get_permalink();
				// $item->get_title();
				// $item->get_date('j M Y, g:i a');
				// $item->get_content();
				// $item->get_description();
				// $item->get_local_date();
				// $item->get_id()
				
				// $item->get_categories();
					// $category->get_label();
				// $item->get_authors();
					// $authors->get_email();
					// $authors->get_link();
					// $authors->get_name();
			}
		}
	}

	/**
	 * Plugin Usage
	 * 
	 * @return void
	 */
	public function usage()
	{
	ob_start(); 
	?>

Parameters
===========================

The tag has three parameters:

- url - The URL of the RSS or Atom feed.
- limit - Number of items to display from feed.
- offset - Skip a certain number of items in the display of the feed.
- refresh - How often to refresh the cache file in minutes.  The plugin default is to refresh the cached file every three hours.


Single Variables
===========================

- feed_title
- feed_link
- feed_copyright
- feed_description
- feed_language

Both RSS 2.0 and Atom 1.0 feeds can have a "feed logo". The following variables
can be used to display the logo:

- logo_title
- logo_url
- logo_link
- logo_width
- logo_height


Pair Variables
===========================

There are three pair variables available: {items}, {categories}, and {authors}.
Both {categories} and {authors}, are only available within {items}. 

{items}
---------------------------

The {items} variable contains all of the items found within the feed:

- title
- link
- description
- content
- date
- local_date
- id

{authors}
---------------------------

The {authors} variable contains information about all of the authors of a 
particular item. Each author has three single variables associated with it:

- email
- link
- name

{categories}
---------------------------

The {categories} variable contains all of the categories that a feed item has 
been assigned. Each category has one useful variable:

- label

Example
===========================

{exp:rss_parser url="http://expressionengine.com/feeds/rss/full/" limit="10" refresh="720"}
<ul>
{items}
<li><a href="{link}">{title}</a></li>
{/items}
</ul>
{/exp:rss_parser}


Changelog
===========================


Version 1.0
---------------------------

	<?php
	$buffer = ob_get_contents();
	
	ob_end_clean(); 

	return $buffer;
	}

	/**
	 * Check to make sure the cache exists and create it otherwise
	 * @return void
	 */
	private function _check_cache()
	{
		// Make sure the cache directory exists and is writeable
		if ( ! @is_dir(APPPATH.'cache/'.$this->cache_name))
		{
			if ( ! @mkdir(APPPATH.'cache/'.$this->cache_name, DIR_WRITE_MODE))
			{
				// TODO: Better failure
				return $this->EE->TMPL->no_results();
			}
		}
	}

} // END Magpie class


/* End of file pi.magpie.php */
/* Location: ./system/expressionengine/plugins/pi.magpie.php */