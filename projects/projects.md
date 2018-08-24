---
layout: page
section: Projects
permalink: /projects/
---

<div class='projects' markdown="1">

{: #own-projects}

### Own projects

{: #contributions}

### Contributions

<!-- Go through all projects and user order css prop to place projects under correct heading -->

{% assign projects = site.projects | sort: 'date' | reverse %}
{% for project in projects %}

<div class='project own-{{ project.own }}'>

{% if project.link %}

<a href='{{ project.link }}' class='project-name'> {{ project.name }} </a>

{% else %}

  <p class='project-name'> {{ project.name }} </P>

{% endif %}

<p class='project-description'> {{ project.description }} </p>

{% if project.stack %}

<div class='project-stack'>
  <div class='svg-icon hammer'> </div>
  <p class='project-stack'> {{ project.stack }} </p>
</div>

{% endif %}

<p class='project-content'> {{ project.content }} </p>

</div>

{% endfor %}

</div>
