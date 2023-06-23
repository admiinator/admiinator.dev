let setX, setY, anim;

class mouseanim {
  constructor(target);
  listener = {
    add: () => {
      anim.play();
      console.log("mousemove listener added");
      setX = gsap.quickTo(".cursor", "x", {duration: 0.3, ease: "power3"});
  
      setY = gsap.quickTo(".cursor", "y", {duration: 0.3, ease: "power3"});
      window.addEventListener('mousemove', e => {
        setX(e.clientX);
        setY(e.clientY);
        collideCheck('button:not([disabled])')
      });
    },
    remove: () => {
      anim.pause();
      console.log("mosuemove listener removed");
      window.removeEventListener('mousemove', ()=>{
        setX().pause();
        setY().play();
      });
    }
  };
  free = () => {
    this.listener = null; //Override the existing data
    delete this.listener; //Remove any referance to the listener
  }
}

document.addEventListener('DOMContentLoaded', () => {
  anim = gsap.set(".cursor", {xPercent: -50, yPercent: -50});
  
  document.addEventListener('mouseenter', e => {
    console.log("Mouse entered");
    mouselistener.add();
  });
  document.addEventListener('mouseleave', e => {
    console.log("Mouse left");
    mouselistener.remove();
  })
});

//Pre-loading targets because getting size of elements lowers web performance

function collideCheck(target) {
  var cursor = $('.cursor');
  var bndOffset = {};
  $(target).toArray().forEach(el => {
    var cPos = {
      x: Math.round(cursor.position().left + cursor.width()/2),
      y: Math.round(cursor.position().top + cursor.height()/2)
    }

    let bnd = el.getBoundingClientRect();
    let tPos = {
      x: bnd.left + bnd.width/2,
      y: bnd.top + bnd.height/2
    }

    bndOffset = {
      w: bnd.width/2 + (bnd.width/100)*20,
      h: bnd.height
    }

    var diff = {
      x: Math.round(Math.abs(tPos.x - cPos.x)),
      y: Math.round(Math.abs(tPos.y - cPos.y))
    }

    if(diff.y <= bndOffset.h && diff.x <= bndOffset.w) {
      transform(el);
    }
    else {
      deform(el);
    }
  });
}

function transform(target) {
  $('.cursor').prop('focus', true);
  let size = $(target)[0].getBoundingClientRect();
  let tPos = {
    x: size.left,
    y: size.top
  }
  let c = $('.cursor').position();
  let cPos = {
    x: c.left,
    y: c.top
  }
  console.log('tPos:',tPos,'cPos:',cPos);
  $('.cursor').css(
    {
      width: size.width,
      height: size.height,
      'border-radius': $(target).css('border-radius')
    }
  );
  mouselistener.remove();
}

function deform() {
  $('.cursor').prop('focus', false);
  $('.cursor').css({
    width: 25,
    height: 25,
    'border-radius': '50%'
  });
  mouselistener.add();
}