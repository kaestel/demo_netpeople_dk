<?php $body_class = "person" ?>
<?php $page_title = "Joe Petagno" ?>
<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.header.php") ?>

<div id="maincontent" class="i:content">

	<div class="vcard person" itemscope itemtype="http://schema.org/Person">
		<div class="image">
			<img alt="Joe Petagno" class="photo" itemprop="image" src="/attachments/people/31/dpnp_joe_frontend.jpg" />
		</div>
		<div class="name fn" itemprop="name">Joe Petagno</div>
		<div class="role" itemprop="role">Art Director</div>
		<div class="tel" itemprop="tel"><a href="callto:+4531425629">+45 3142 5629</a></div>
		<div class="email" itemprop="email"><a href="mailto:jope@dpnp.dk">jope@dpnp.dk</a></div>
	</div>

	<ul class="tools">
		<li class="linkedin"><a href="http://dk.linkedin.com/in/joepetagno" target="_blank">LinkedIn</a></li>
		<li class="facebook"><a href="http://www.facebook.com/profile.php?id=624091379" target="_blank">Facebook</a></li>
	</ul>

</div>

<?php include_once($_SERVER["LOCAL_PATH"]."/templates/www.footer.php") ?>
