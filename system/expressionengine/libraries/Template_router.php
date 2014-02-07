<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Template Router Class
 *
 * @package		ExpressionEngine
 * @subpackage	Core
 * @category	Core
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */
class EE_Template_Router extends CI_Router {

	public $end_points = array();

	function __construct()
	{
		require_once APPPATH.'libraries/template_router/Match.php';
		require_once APPPATH.'libraries/template_router/Route.php';
		ee()->lang->loadfile('template_router');
		$this->set_routes();
	}

	/**
	 * Match a URL to its template and group
	 * 
	 * @param EE_URI $uri 
	 * @access public
	 * @return EE_Route_match Instantiated match object for the matched template & group
	 */
	public function match($uri)
	{
		$request = $uri->uri_string;

		// First check if we have a bare match
		if ( ! empty($this->end_points[$request]))
		{
			return $this->end_points[$request];
		}

		foreach ($this->end_points as $route => $end_point)
		{
			if(preg_match_all("/$route/i", $request, $matches) == 1)
			{
				return new EE_Route_match($end_point, $matches);
			}
		}

		throw new Exception(lang('route_not_found'));
	}

	/**
	 * Grab our parsed template routes from the database
	 * 
	 * @access protected
	 * @return void
	 */
	public function set_routes()
	{
		ee()->db->select('route_parsed, template_name, group_name');
		ee()->db->from('templates');
		ee()->db->join('template_groups', 'templates.group_id = template_groups.group_id');
		ee()->db->where('route_parsed is not null');
		$query = ee()->db->get();

		foreach ($query->result() as $template)
		{
			$this->end_points[$template->route_parsed] = array(
				"template" => $template->template_name,
				"group"    => $template->group_name
			);
		}
	}

	/**
	 * Fetch the template route for the specified template.
	 * 
	 * @param string $group		The name of the template group
	 * @param string $template	The name of the template 
	 * @access public
	 * @return EE_Route  An instantiated route object for the matched route
	 */
	public function fetch_route($group, $template)
	{
		ee()->db->select('route, template_name, group_name');
		ee()->db->from('templates');
		ee()->db->join('template_groups', 'templates.group_id = template_groups.group_id');
		ee()->db->where('template_name', $template);
		ee()->db->where('group_name', $group);
		ee()->db->where('route is not null');
		$query = ee()->db->get();

		if ($query->num_rows() > 0)
		{
			return new EE_Route($query->row()->route);
		}
	}

	/**
	 * Create EE_Route object from EE formatted route string
	 * 
	 * @param string $route   An EE formatted route string 
	 * @param bool $required  Set whether segments are optional or required
	 * @access public
	 * @return EE_Route The instantiated route object.
	 */
	public function create_route($route, $required = FALSE)
	{
		return new EE_Route($route, $required);
	}

}
// END CLASS

/* End of file Template_router.php */
/* Location: ./system/expressionengine/libraries/Template_router.php */