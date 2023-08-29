<?php $body_class = "person" ?>
<?php $page_title = "Joakim Norman" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.header.php") ?>

<div id="maincontent" class="i:content">

	<div class="vcard person" itemscope itemtype="http://schema.org/Person">
		<div class="image">
			<img alt="Joakim Norman" class="photo" itemprop="image" src="/attachments/people/44/dpnp_joakim_frontend.jpg" />
		</div>
		<div class="name fn" itemprop="name">Joakim Norman</div>
		<div class="role" itemprop="role">Art Director</div>
		<div class="tel" itemprop="tel"><a href="callto:+4522655214">+45 2265 5214</a></div>
		<div class="email" itemprop="email"><a href="mailto:jono@dpnp.dk">jono@dpnp.dk</a></div>
	</div>

	<ul class="tools">
		<li class="twitter"><a href="https://twitter.com/#!/joakimnorman" target="_blank">Twitter</a></li>
		<li class="linkedin"><a href="http://www.linkedin.com/pub/joakim-norman/5/142/823" target="_blank">LinkedIn</a></li>
		<li class="facebook"><a href="http://www.facebook.com/joakim1norman" target="_blank">Facebook</a></li>
	</ul>

</div>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.footer.php") ?>
